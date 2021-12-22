function toggleText(button_id, text1, text2) {

  if (document.getElementById(button_id).innerText === text1) {
    document.getElementById(button_id).innerText = text2;
  } else {
    document.getElementById(button_id).innerText = text1;
  }
}