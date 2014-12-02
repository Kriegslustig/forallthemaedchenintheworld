var createAGallerizer = function () {
	var gallery,
		galleryItemSelector = '.gallery-item',
		galleryItems,
		err = {
			'noURL': 'No attachment link found, please check if you have set the gallery items to link to their media-files',
		},
		galleryFullElem = document.createNode('div');

		galleryFullElem.className = 'gallerizer-viewbox';

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
			galleryIndex++

		if(thisURL !== undefined) {
			goToGalleryAt(thisURL);
		} else {
			alert(err['noURL'])
		}
	}

	function goToGalleryAt (url) {
		var thisURL = item.getElementsByTagName('a')[0].href;
		if(thisURL !== undefined) {
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