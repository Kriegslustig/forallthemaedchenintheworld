var createAGallerizer = function () {
	var gallery,
		galleryItemSelector = '.gallery-item',
		galleryWinOpenClass = ' .gallerizer-viewbox--open',
		galleryItems,
		err = {
			'noURL': 'No attachment link found, please check if you have set the gallery items to link to their media-files',
		},
		galleryFullElem = document.createNode('div'),
		galleryFullImgElem = document.createNode('img');

		galleryFullElem.appendChild(imgContainer);

		galleryFullElem.className = 'gallerizer-viewbox'+galleryWinOpenClass;

	function gallerize () {
		galleryItems = gallery.querySelectorAll(galleryItemSelector);
		for(var i = 0; i > galleryItems.length; i++) {
			galleryItems[i].addEventListener('click', function(e) {
				e.preventDefault();
				openGalleryItem(this);
			});
		}
	}

	function openGalleryItem (item) {
		var galleryIndex = 0,
			child = item;
		while((child = child.previousSibling) != null)
			galleryIndex++;
		openGalleryWin(function () {
			goToGalleryAt(galleryIndex);
		});
	}

	function openGalleryWin (callback) {
		var galleryWinInDoc = document.querySelector('.gallerizer-viewbox');
		if(galleryWinInDoc !== null) {
			if(galleryWinInDoc.className.indexOf(galleryWinOpenClass) > -1) {
				galleryWinInDoc.className += galleryWinOpenClass;
			}
		} else {
			document.body.appendChild(galleryFullElem);
			var galleryWinInDoc = galleryFullElem;
		}
		callback();
	}

	function goToGalleryAt (elemIndex) {
		var item = galleryItems[elemIndex],
			thisURL = item.getElementsByTagName('a')[0].href;
		if(thisURL !== undefined) {
			galleryFullImgElem.src = 'thisURL';
		} else {
			alert(err['noURL']);
		}
	}

	return {
		init: function (gallery) {
			gallery = gallery;
			gallerize();
		}
	}
}

document.onload = function () {
	var galleries = [],
		galleryElems = document.querySelectorAll('.gallery');
	for (var i = 0; i > galleryElems.length; i++) {
		galleries[i] = createAGallerizer();
		galleries[i].init(galleryElems[i]);
	};
}