// 現在地の取得
function GetLocation() {
    navigator.geolocation.getCurrentPosition(AddLocation);
    // navigator.geolocation.watchPosition(AddLocation);
}
function AddLocation(position) {
    // let GpsEntityPlace = entity.getAttribute('gps-entity-place');
    let geo_lat = position.coords.latitude;
    let geo_lng = position.coords.longitude;
    // $('a-scene').appendChild($("<a-entity gps-entity-place=latitude:" + geo_lat + "; longitude:" + geo_lng + ";look-at=[gps-camera] scale = 1 1 1 potion=0 3 0 animation=property:rotation; dur:10000; from : 0 0 0; to : 0 360 0; loop : -1 ; easing:linear;gltf-model=#char></a-entity>"));
    $('a-assets').after($("<a-entity gps-entity-place=latitude:" + geo_lat + "; longitude:" + geo_lng + ";look-at=[gps-camera] scale =1,1,1 potion=0,3,0 animation=property:rotation;dur:10000;from:0,0,0;to:0,360,0;loop:-1;easing:linear; gltf-model=#char></a-entity>" ));
    let entity = document.querySelector('a-entity');
    $(entity).attr('gps-entity-place',"latitude:" + geo_lat + "; longitude:" + geo_lng +";");
    console.log(entity.getAttribute('gps-entity-place'));
    console.log(entity);
}

GetLocation();

window.addEventListener("load", () => {
    const btn = document.querySelectorAll('button');
    let camera = document.querySelector('a-camera');
    const gui_cursor = camera.innerHTML

// $('a-box').on('click',()=>{
//     $(btn).addClass("slidein");
// });
$('a-entity').on('click',()=>{
    $(btn).addClass("slidein");
});
$('#back').on('click',()=>{
    $(btn).toggleClass("slidein");
});
$('#info').on('click',()=>{
    $('.info').css({'max-height':'90%','transition': '.8s'});
    $(btn).toggleClass("slidein");
});
$('.backbtn').on('click',()=>{
    $('.info').css({'max-height':'0%','transition': '.8s'});
    $(btn).toggleClass("slidein");
});
$('#stamp').on('click',()=>{
    alert('スタンプゲット');
    $('#stamp-list').css({'transform':'translate(-50%,150%)','transition': '.8s'})
    $(btn).toggleClass("slidein");
});
$('#stampback').on('click',()=>{
    $('#stamp-list').css({'transform':'translate(-50%,-150%)','transition': '.8s'})
    $(btn).toggleClass("slidein");
});
$('#camera').on('click',()=>{
    $('.photo-contens').css({'transform':'translateY(0%)','transition': '.8s'});
    $(btn).toggleClass("slidein");
    $('#camera-back').css('transform','translateY(0%)'); 
    // camera.innerHTML="";
});
$('#camera-back').on('click',()=>{
    // location.reload();
    $(btn).toggleClass("slidein");
    $('.photo-contens').css({'transform':'translateY(150%)','transition': '.8s'});
    $('#camera-back').css('transform','translateY(-150%)'); 
});
// カメラ機能
let image = document.querySelector('#snap');
let take_photo_btn = document.querySelector('#take-photo');
let delete_photo_btn = document.querySelector('#delete-photo');
let download_photo_btn = document.querySelector('#download-photo');

//スナップショットボタン
take_photo_btn.addEventListener("click", function (e) {
    e.preventDefault();
    let video = document.querySelector('video');
    let snap = takeSnapshot(video);
    
    //スナップショット表示.
    image.setAttribute('src', snap);
    image.classList.add('visible');
    
    // 削除ボタンと保存ボタン有効
    delete_photo_btn.classList.remove("disabled");
    download_photo_btn.classList.remove("disabled");
    
    // 保存ボタンにスナップショットを渡す
    download_photo_btn.href = snap;
});

//削除ボタン
delete_photo_btn.addEventListener("click", function(e){

    e.preventDefault();

    // スナップショットを隠す
    image.setAttribute('src', "");
    image.classList.remove("visible");
    
    // 削除ボタンと保存ボタン無効
    delete_photo_btn.classList.add("disabled");
    download_photo_btn.classList.add("disabled");
    
});

//スナップショットを撮る
function takeSnapshot(video) {
    let resizedCanvas = document.createElement("canvas");
    let resizedContext = resizedCanvas.getContext("2d");
    let width = video.videoWidth;
    let height = video.videoHeight;
    let aScene = document.querySelector("a-scene").components.screenshot.getCanvas("perspective");
    
    if (width && height) {
        //videoのサイズをキャンバスにセット
        resizedCanvas.width = width;
        resizedCanvas.height = height;
        //キャンバスにvideoをコピー
        resizedContext.drawImage(video, 0, 0, width, height);
        
        //カメラの画角でar側の縮小処理を変える
        if (width > height) {
            // 横長（PC)
            resizedContext.drawImage(aScene, 0, 0, width, height);
        } else {
            // 縦長（スマホ）
            let scale = height / width;
            let scaledWidth = height * scale;
            let marginLeft = (width - scaledWidth) / 2;
            resizedContext.drawImage(aScene, marginLeft, 0, scaledWidth, height);
        }
        return resizedCanvas.toDataURL('image/png');
    }
}
});
