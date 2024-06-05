var list = [
    {
        path: [new kakao.maps.LatLng(33.452344169439975, 126.56878163224233), new kakao.maps.LatLng(33.452739313807456, 126.5709308145358)],
        color: '#FFAE00'
    },
    {
        path: [new kakao.maps.LatLng(33.452739313807456, 126.5709308145358), new kakao.maps.LatLng(33.45178067090639, 126.5726886938753)],
        color: '#FF3DE5'
    }
]; 
    
for(var i=0; i<data.length; i++) {
    //i번째 정보를 가져옵니다.
    var item = data[i];
    // 지도에 표시할 선을 생성합니다
	var polyline = new kakao.maps.Polyline({
        map: map, //지도에 선을 표시합니다.
    	path: item.path, // 선을 구성하는 좌표배열 입니다
	    strokeWeight: 5, // 선의 두께 입니다
    	strokeColor: item.color, // 선의 색깔입니다
	    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    	strokeStyle: 'solid' // 선의 스타일입니다
	});
}