import { StyleSheet } from "react-native";

const appStyles = StyleSheet.create({
    container: {
        alignItems: "stretch",
        flex: 1,
    },
    containerApp: {
        alignItems: "stretch",
        flex: 1,
    },
    containerBody: {
        flex: 1,
    },
    containerFooter: {
        backgroundColor: "#2e3703",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 16,
    },
    containerFooterError: {
        backgroundColor: "crimson",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 16,
    },
    containerHeader: {
        flexBasis: "auto",
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 48,
    },
    containerPostAndUserItemWithUser: {
        alignItems: "stretch",
        flex: 1,
        flexDirection: "row",
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
    },
    containerPostAndUserPostArea: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
    },
    containerPostAndUserUserArea: {
        flexBasis: "auto",
        maxWidth: 70,
        paddingLeft: 8,
        paddingRight: 8,
    },
    containerPostItemSimple: {
        flex: 1,
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
    },
    textFooter: {
        alignSelf: "center",
        color: "white",
        fontSize: 10,
    },
    textInfo: {
        fontSize: 10,
    },
    textPostPreviewBody: {
        fontFamily: "Helvetica Neue",
        fontSize: 14,
    },
    textPostTitle: {
        fontFamily: "HelveticaNeue-Light",
        fontSize: 24,
    },
});

export default appStyles;
