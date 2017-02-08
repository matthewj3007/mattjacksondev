function createGallery(imageList, imgFolder, galleryDivID) {
    
    var galleryDiv = document.getElementById(galleryDivID);
    var numImages = imageList.length;
    
    var cellBottoms = new Map();
    var column0Count = 0;
    var column1Count = 0;
    var column2Count = 0;
    
    var numColumn0Images = Math.floor(numImages/3);
    var numColumn1Images = Math.floor(numImages/3);
    var numColumn2Images = Math.floor(numImages/3);
    switch(numImages%3) {
        case 1: numColumn0Images++; break;
        case 2: numColumn0Images++;
                numColumn1Images++; break;
    }
    var column0Loaded = false;
    var column1Loaded = false;
    var column2Loaded = false;
    
    for(i = 0; i < numImages; i++) {
        
        var cellDiv = document.createElement('div');
        cellDiv.setAttribute('class','gallery_image');
        cellDiv.setAttribute('id', 'gal_div_'+i);
        galleryDiv.appendChild(cellDiv);
        cellDiv.style.position = 'absolute';
        cellDiv.style.left = (i%3)*33 + '%';
        cellDiv.style.width = (galleryDiv.clientWidth/3)-10 + 'px';
        cellDiv.style.padding = '5px';
        cellDiv.style.opacity = '0';
        
        var img = document.createElement('img');
        img.i = i;
        img.setAttribute('id', 'gal_img_'+i);
        img.style.maxWidth = '100%';
        cellDiv.appendChild(img);
        
        $(img).on('load', function() {
            if(this.i%3 == 0)
                column0Count++;
            if(this.i%3 == 1)
                column1Count++;
            if(this.i%3 == 2)
                column2Count++;
            
            if(column0Count == numColumn0Images && !column0Loaded) {
                loadColumn(0, numImages);
                column0Loaded = true;
            }
            if(column1Count == numColumn1Images && !column1Loaded) {
                loadColumn(1, numImages);
                column1Loaded = true;
            }
            if(column2Count == numColumn2Images && !column2Loaded) {
                loadColumn(2, numImages);
                column2Loaded = true;
            }
        });
        img.src = 'res/'+imgFolder+'/'+imageList[i];
    }
}

function loadColumn(columnIndex, numImages) {
    var prevBottom = 0;
    for(i = columnIndex; i < numImages; i += 3) {
        var cellDiv = document.getElementById('gal_div_'+i);
        cellDiv.style.top = prevBottom + 'px';
        prevBottom += cellDiv.clientHeight;
        $(cellDiv).fadeTo('slow','1');
    }
}

function fetchImages(imgFolder) {
    var galleryDivID = 'gallery';
    var gallery = document.getElementById(galleryDivID);
    
   if(gallery.imgFolder != imgFolder) {
       
       try {
           imageList = jQuery.ajax({
               url: 'getimages.php',
               type: 'POST',
               data: { imgtype : imgFolder },
               success: function(response) {
                   var imageList = Object.values(response);
                   remakeGallery(imageList, imgFolder, galleryDivID);
                   gallery.imgFolder = imgFolder;
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
}

function remakeGallery(imageList, imgFolder, galleryDivID) {
    var gallery = document.getElementById(galleryDivID);
    if(gallery.childElementCount > 0) {
        $('.gallery_image').fadeTo('fast', '0', function() {
            gallery.innerHTML = '';
            createGallery(imageList, imgFolder, galleryDivID);
        });
    } else {
        createGallery(imageList, imgFolder, galleryDivID);
    }
}


         