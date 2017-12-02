import { AnyAction, combineReducers, Reducer } from "redux";
import { ActionType } from "./actions";
import { ActivityStatus, IAppState, IPost, IUser } from "./models";

const initialState: IAppState = {
    activityStatus: ActivityStatus.NoActivity,
    posts: [],
    users: [],
};

/**
 * Provides all the posts, unfiltered.
 * @param state Current list of posts.
 * @param action Triggered action used to generate a new state. Just ActionType.ReceivedPosts
 * a payload can change the behaviour of returning the current state.
 * @see ActionType
 * @see IPost
 */
const postsReducer: Reducer<IPost[]> =
    (state: IPost[] = initialState.posts, action: AnyAction): IPost[] => {
        switch (action.type) {
            case ActionType.ReceivedPosts:
                console.debug("Updating list of posts");
                const posts = action.payload as IPost[];
                return posts.concat(); // creating a new list just in case.
            default:
                console.debug("Requested cached list of posts.");
                return state;
        }
    };

const usersReducer: Reducer<IUser[]> =
    (state: IUser[] = initialState.users, action: AnyAction): IUser[] => {
        switch (action.type) {
            case ActionType.ReceivedUsers:
                console.debug("Updated list of users.");
                return action.payload;
            default:
                console.debug("Requested cached list of users.");
                return state;
        }
    };

/**
 * Indicates if the application is performing a process in the background.
 * @param state indicator of activity.
 * @param action modifier of the activity indicator.
 * @see ActivityStatus
 */
const activityIndicatorReducer: Reducer<ActivityStatus> =
    (state: ActivityStatus = initialState.activityStatus, action: AnyAction): ActivityStatus => {
        switch (action.type) {
            case ActionType.FetchingStarted: return ActivityStatus.Loading;
            case ActionType.FetchingDone: return ActivityStatus.Loaded;
            case ActionType.FailedFetchingUsers: return ActivityStatus.Loaded;
            case ActionType.FailedFetchingPosts: return ActivityStatus.LoadingFailed;
        }
        return state;
    };

 // remember this object should match the definition of the application state.
const allReducers = combineReducers({
    activityStatus: activityIndicatorReducer,
    posts: postsReducer,
    users: usersReducer,
});

export { allReducers, postsReducer };
// and getting everything to work in the appShell...
