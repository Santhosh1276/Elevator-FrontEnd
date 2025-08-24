// elevatorReducer.js

// Keep a short rolling history per elevator for charts
const MAX_POINTS = 120; // ~2 minutes at 1s/tick

export const initialState = {
    elevators: [],     // list of latest elevator docs (denormalized by socket)
    alerts: [],        // any alerts you decide to push here later
    series: {},        // { [elevatorId]: [{ ts, motorTempC, ropeTensionN, loadKg }] }
};

export function elevatorReducer(state, action) {
    switch (action.type) {
        case "SET_ELEVATORS":
            return { ...state, elevators: action.payload };

        case "UPDATE_ELEVATOR":
            // Merge/update the elevator doc in-place
            return {
                ...state,
                elevators: mergeElevator(state.elevators, action.payload),
            };

        case "ADD_SNAPSHOT": {
            const { id, ts, ro } = action.payload;
            const prev = state.series[id] || [];
            const next = [...prev, { ts, ...ro }];
            // Keep only last MAX_POINTS
            const trimmed = next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next;
            return {
                ...state,
                series: { ...state.series, [id]: trimmed },
            };
        }

        case "ADD_ALERT":
            return { ...state, alerts: [action.payload, ...state.alerts] };

        default:
            return state;
    }
}

// Helper to upsert an elevator by _id (or id)
function mergeElevator(list, patch) {
    // Normalize id field
    const pid = patch._id || patch.id;
    const idx = list.findIndex((e) => (e._id || e.id) === pid);
    if (idx === -1) {
        // If it wasn't in the list yet (e.g., socket arrived before initial GET)
        return [...list, { _id: pid, ...patch }];
    }
    const current = list[idx];
    const updated = { ...current, ...patch, _id: pid };
    const copy = [...list];
    copy[idx] = updated;
    return copy;
}
