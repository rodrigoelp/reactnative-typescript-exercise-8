import { AnyAction, Dispatch } from "redux";
import { isNullOrUndefined } from "./globalfunctions";
import { IPost, IUser } from "./models";
import { Fetcher } from "./services";

/**
 * Defining the list of actions I will be
 * handling.
 * I prefer to create enuemrations for this
 * as opposed of having consts SHOUTING_NAMES
 *
 * Technically, is going to be the same(ish).
 */
enum ActionType {
    FetchingStarted = "DATA_FETCHING",
    FetchingDone = "DATA_FETCHED",
    ReceivedPosts = "POSTS_RECEIVED",
    FailedFetchingPosts = "POSTS_FAILED",
    ReceivedUsers = "USERS_RECEIVED",
    FailedFetchingUsers = "USERS_FAILED",
}

/**
 * Action passed to reducers.
 */
interface ITypedAction<T> extends AnyAction {
    /**
     * Describes the type used to create the action. Any reducer subscribed to it
     * will need to inspect the type to filter it.
     */
    type: ActionType;
    /**
     * Action's payload
     */
    payload: T;
}

// I could've follow most examples that sets a timer to wait
// for a while and return with some result... But, what is the fun in that?
// Consuming a restful API is probably a more "real life" exercise... so, let's do that!
// Thankfully, there is a set of available at jsonplaceholder, which mimics the
// information provided by a blog.
// so I am going to start using the https://jsonplaceholder.typicode.com/posts api
// and build from there.

const serviceUrl = "https://jsonplaceholder.typicode.com";
const getPostsUrl = () => `${serviceUrl}/posts`;
const getPostUrl = (id: number) => `${getPostsUrl()}/${id}`;
const getUsersUrl = () => `${serviceUrl}/users`;
const getUserUrl = (id: number) => `${getUsersUrl()}/${id}`;

const fetchPostsAndUsersActionCreator = () => (dispatch: Dispatch<any>) => {
    dispatch(createLightAction(ActionType.FetchingStarted));
    return Fetcher.fetchInstanceOf<IPost[]>(getPostsUrl())
        .then((result) => dispatch(createTypedAction(ActionType.ReceivedPosts, result)))
        .catch((err) => {
            console.debug("Failed to download the list of posts: ", err);
            dispatch(createLightAction(ActionType.FailedFetchingPosts));
        })
        .then((_) => Fetcher.fetchInstanceOf<IUser[]>(getUsersUrl()))
        .then((result) => dispatch(createTypedAction(ActionType.ReceivedUsers, result)))
        .then((_) => dispatch(createLightAction(ActionType.FetchingDone)))
        .catch((err) => {
            console.debug("Failed to download the list of users: ", err);
            dispatch(createLightAction(ActionType.FailedFetchingUsers));
        });
};

// helper functions to create the actions.
function createTypedAction<T>(type: ActionType, payload: T): ITypedAction<T> {
    return { type, payload };
}

function createLightAction(type: ActionType): AnyAction {
    return { type };
}

// exporting what is meaningful... Now to get the reducer to
// respond as expected.
export { ActionType, ITypedAction, fetchPostsAndUsersActionCreator };
