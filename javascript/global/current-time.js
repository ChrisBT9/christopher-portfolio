// Give an element the 'id' of current-time 

const currentTimeElement = document.getElementById("current-time");
function updateCurrentTime() {
  const now = new Date();
  currentTimeElement.textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "numeric", hour12: true });
}
updateCurrentTime();
setInterval(updateCurrentTime, 60000);
