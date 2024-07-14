export const  configUrl = {
    base:"http://localhost:3005/",
    systemNotification:"systemNotification",
    notification:"notification",
    services: {
        login:"auth/login",
        notificationsByUser:"findByUserId",
        readNotification:"read",
        unreadNotification:"unread",
    }
}