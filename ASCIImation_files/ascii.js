const FONTSIZE = {
  'Tiny': '7pt',
  'Small': '10pt',
  'Medium': '12pt',
  'Large': '16pt',
  'Extra Large': '24pt',
  'XXL': '32pt'
}

window.onload = function() {
  let intervalTime = 250;
  document.getElementById('start').onclick = function() {
    const textArea = document.getElementById('text-area');
    const values = textArea.value.split('=====\n');
    if (values.length > 0) {
      this.disabled = true;
      document.getElementById('animation').disabled = true;
      document.getElementById('stop').disabled = false;
      let i = 0;
      intervalTime = document.getElementById('turbo').checked === true ? 50 : 250;
      setIntervalId = setInterval(function(){
        if(i == values.length) i = 0;
        textArea.value = values[i];
        i++;
      }, intervalTime);
    }
  }
  document.getElementById('stop').onclick = function() {
    this.disabled = true;
    document.getElementById('start').disabled = false;
    document.getElementById('animation').disabled = false;
    clearInterval(setIntervalId);
    updateTextAreaValue(document.getElementById('animation'));
  }
  document.getElementById('animation').onchange = function() {
    updateTextAreaValue(this);
  }
  document.getElementById('fontsize').onchange = function() {
    const selectedOption = this.options[this.selectedIndex].value;
    document.getElementById('text-area').style.fontSize = FONTSIZE[selectedOption];
  }
  document.getElementById('turbo').onclick = function(){
    const isRunning = document.getElementById('start').disabled;
    intervalTime = this.checked === true ? 50 : 250;
    if (isRunning === true){
      clearInterval(setIntervalId);
      const textArea = document.getElementById('text-area');
      const currentValue = textArea.value.trim();
      const animation = document.getElementById('animation');
      const animationSelectedOption = animation.options[animation.selectedIndex].value;
      const values = ANIMATIONS[animationSelectedOption].split('=====\n');
      let i = 0;
      for(let j in values) {
        if(values[j] === currentValue)
          i = j;
      }
      setIntervalId = setInterval(function(){
        if(i == values.length) i = 0;
        textArea.value = values[i];
        i++;
      }, intervalTime);
    }
  }

  function updateTextAreaValue(el) {
    const selectedOption = el.options[el.selectedIndex].value;
    document.getElementById('text-area').value = ANIMATIONS[selectedOption];
  }

  function ex(){
    document.getElementById('text-area').value += 'a';
  }
}

