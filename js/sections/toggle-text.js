function toggleText(button_id, text1, text2) {

  if (document.getElementById(button_id).innerText === text1) {
    document.getElementById(button_id).innerText = text2;
    document.getElementById(button_id).classList.remove('ready-to-show');
  } else {
    document.getElementById(button_id).innerText = text1;
    document.getElementById(button_id).classList.add('ready-to-show');
  }
}