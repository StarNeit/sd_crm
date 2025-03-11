// import EventEmitter from "events"
//
// // Create a singleton service to manage data refresh
// class DataRefreshService extends EventEmitter {
//     private refreshInterval: number = 15 * 60 * 1000 // 15 minutes
//     private timer: NodeJS.Timeout | null = null
//     private nextRefreshTime: Date | null = null
//
//     constructor() {
//         super()
//         // Set max listeners to avoid warning
//         this.setMaxListeners(30)
//     }
//
//     // Start the refresh timer
//     startRefreshTimer() {
//         this.stopRefreshTimer() // Clear any existing timer
//
//         // Set the next refresh time
//         this.nextRefreshTime = new Date()
//         this.nextRefreshTime.setTime(this.nextRefreshTime.getTime() + this.refreshInterval)
//
//         // Emit the next refresh time event
//         this.emit("nextRefreshTimeUpdated", this.nextRefreshTime)
//
//         // Set the timer
//         this.timer = setTimeout(() => {
//             // Emit refresh event
//             this.emit("refresh")
//
//             // Restart the timer
//             this.startRefreshTimer()
//         }, this.refreshInterval)
//
//         return this.nextRefreshTime
//     }
//
//     // Stop the refresh timer
//     stopRefreshTimer() {
//         if (this.timer) {
//             clearTimeout(this.timer)
//             this.timer = null
//         }
//     }
//
//     // Get the next refresh time
//     getNextRefreshTime(): Date | null {
//         return this.nextRefreshTime
//     }
//
//     // Trigger a manual refresh
//     manualRefresh() {
//         // Emit refresh event
//         this.emit("refresh")
//
//         // Restart the timer
//         this.startRefreshTimer()
//     }
//
//     // Update the refresh interval
//     setRefreshInterval(minutes: number) {
//         this.refreshInterval = minutes * 60 * 1000
//
//         // Restart the timer with the new interval
//         if (this.timer) {
//             this.startRefreshTimer()
//         }
//     }
// }
//
// // Export a singleton instance
// export const dataRefreshService = new DataRefreshService()
//
