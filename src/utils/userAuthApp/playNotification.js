import notificationSound from "../../assets/userAuthApp/audio/notificationSound.mp3";

export default function playNotification() {
  const sound = new Audio(notificationSound);
  sound.play();
}
