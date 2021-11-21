$(function(){
  //変数のセット
  let listNm;//何番目のコンテンツか？をどの関数でも使えるように
  let slideVol;//コンテンツ内のスライドの数をどの関数でも使えるように
  let slidePosi = 0;//スライドの位置変数の設定と初期値の代入

  //ポップアップ時の背景用の要素を生成
  $(".contents").prepend("<div class='back'></div>");

  //スライドエリアの横幅の設定
  $(".slidearea ul").each(function(i){
    //要素の中にあるliの数を取得
    let slideNm = $(this).find("li").length;
    //liの数×100%の幅に設定する
    $(this).css("width",slideNm * 100 + "%");
  });

  //スライドナビをクリックした時
  $(".navigation div").on("click",function(){
    //nextかprevかを判定
    if($(this).hasClass("next")){
      slidePosi += 1;//slidePosiに１プラス
      if(slidePosi>=slideVol){//もしスライドの数以上になったら
        slidePosi = slideVol - 1;//それ以上大きくならないようにする
      }
    }else{
      slidePosi -= 1;//slidePosiに１マイナス
      if(slidePosi <= 0){//0以下になったら
        slidePosi = 0;//それ以下にならないように
      }
    }
    //transformで位置を動かす
    $(".contents .cont").eq(listNm).find(".slidearea ul").css("transform","translateX(-" + slidePosi * 100 / slideVol + "%)");
  });

  //リストをクリックした時
  $(".cont-list li").on("click",function(){
    //何番目をクリックしたか
    listNm = $(".cont-list li").index(this);
    //スライドボタンようにスライドの数を取得＆スライド位置のリセット
    slideVol = $(".contents .cont").eq(listNm).find("li").length;
    //対応するコンテンツを表示
    $(".contents .cont").eq(listNm).fadeIn(200);
    //背景とクローズボタンを表示
    $(".contents .back,.contents .close-btn").fadeIn(200);
  });

  //クローズボタンをクリックした時
  $(".contents .close-btn").on("click",function(){
    //表示していたコンテンツに対応するリストにクラスを追加
    $(".cont-list li").eq(listNm).addClass("done");
    //表示していたポップアップを非表示
    $(".contents .cont,.contents .back,.contents .close-btn").fadeOut(200);
    //スライドの変数をリセット
    slidePosi = 0;
    //transformで位置を動かす
    $(".contents .cont").eq(listNm).find(".slidearea ul").css("transform","translateX(-" + slidePosi * 100 / slideVol + "%)");
  });
});