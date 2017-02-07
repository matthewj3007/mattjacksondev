function createGallery(imageList, galleryDivID) {
    console.log("Creating gallery");
    
    var galleryDiv = document.getElementById(galleryDivID);
    var numImages = imageList.length;
    
    console.log("Number of images returned: "+numImages);
    var cellBottoms = []
    
    for(i = 0; i < numImages; i++) {
        var cellDiv = document.createElement('div');
        cellDiv.setAttribute('class','gallery_image');
        galleryDiv.appendChild(cellDiv);
        cellDiv.style.position = 'absolute';
        cellDiv.style.left = (i%3)*33 + '%';
        cellDiv.style.width = (galleryDiv.clientWidth/3)-10 + 'px';
        cellDiv.style.padding = '5px';
        //cellDiv.style.opacity = '0';
        
        var img = document.createElement('img');
        cellDiv.appendChild(img);
        img.onload = imageOnLoad(i, cellDiv, cellBottoms, img);
        img.src = 'res/'+imageList[i];
    }
}

function imageOnLoad(i, cellDiv, cellBottoms, img) {
    if(i < 3) {
        cellDiv.style.top = '0px';
        console.log("client height: "+cellDiv.clientHeight);
        cellBottoms.push(cellDiv.clientHeight);
    } else {
        console.log("cellbottom: "+cellBottoms[i-3]);
        cellDiv.style.top = cellBottoms[i-3] + 'px';
        cellBottoms.push(cellDiv.clientHeight + cellBottoms[i-3]);
    } 
    $(img).fadeIn();
    console.log(cellBottoms);
}

function loadImages() { 
   try {
       imageList = jQuery.ajax({
           url: 'init.php',
           type: 'POST',
           success: function(response) {
               var imageList = Object.values(response);
               createGallery(imageList, 'gallery');
           },
           error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            },
           dataType: 'json'
       }); 
   } catch (err) {
       console.log(err.message);
   }
}

function deleteGallery() {
    console.log("Deleting gallery");
    $('.gallery_image').fadeTo('slow', '0');
}


         