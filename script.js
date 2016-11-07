let slider = document.getElementById('slider');
let content = document.getElementById('content');
let number = document.querySelectorAll('.photo').length;
let line = document.getElementById('line');
let polz = document.getElementById('polz');

content.style.width = (document.querySelector('.photo').offsetWidth+10)*number+'px';

polz.onmousedown = function(e) {
	let coordX = getCoords(line);
	function getCoords(elem) {
	  let box = elem.getBoundingClientRect();
	  return {
	    left: box.left + pageXOffset
	  };

	}
	
	let coords = getCoords(polz);
	let shiftX = e.pageX - coords.left;

  	moveAt(e);

  	function moveAt(e) {
  		let procent = Math.round((e.pageX - coordX.left - shiftX)/(line.offsetWidth - polz.offsetWidth)*100);
  		if(e.pageX - coordX.left - shiftX<0) {
  			polz.style.left = '0px';
  		} else if (e.pageX - coordX.left - shiftX + polz.offsetWidth > line.offsetWidth) {
  			polz.style.left = (line.offsetWidth - polz.offsetWidth) + 'px';
  		} else {
  			polz.style.left = e.pageX - coordX.left - shiftX + 'px';
  		}
  		if (procent<0){
  			content.style.transform = 'translateX(0px)';
  		} else if (procent>100) {
  			content.style.transform = `translateX(${-(content.offsetWidth-slider.offsetWidth)}px)`;
  		} else {
  			content.style.transform = `translateX(${-(content.offsetWidth-slider.offsetWidth)*procent/100}px)`;
  		}
  	}

  	document.onmousemove = function(e) {
    	moveAt(e);
  	};

  	document.onmouseup = function() {
    	document.onmousemove = null;
    	polz.onmouseup = null;
  	};

}

polz.ondragstart = function() {
  return false;
};