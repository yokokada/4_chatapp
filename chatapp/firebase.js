 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
 import { getDatabase, ref, push, set, onChildAdded, remove,child,onChildRemoved } 
 from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";


 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyA9Y_0N5Vov3YiL_-9kNQfDXcPyF82timg",
   authDomain: "gsdemo-eee77.firebaseapp.com",
   projectId: "gsdemo-eee77",
   storageBucket: "gsdemo-eee77.appspot.com",
   messagingSenderId: "200008416504",
   appId: "1:200008416504:web:161ba11c05e6f0fc298f0d"
 };

 // Firebaseと接続してやりとりできるようにする
 // 
 const app = initializeApp(firebaseConfig);      
 const db = getDatabase(app);
 const dbRef = ref(db, "chat");
 // 午後の方はchat2に
 const p_app = initializeApp(firebaseConfig);      
 const p_db = getDatabase(app);
 const p_dbRef = ref(db,"chat2")

// }
// 時間を＃timeに記載
let eMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let week   = ["日", "月", "火", "水", "木", "金", "土"];

//日時取得
let now = new Date();            //日付取得準備（必須）！！
let year = now.getFullYear();    //年
let month = now.getMonth() + 1;  //月+１を足す
let date = now.getDate();        //日
let day = now.getDay();          //曜日（数値）
let h = now.getHours();          //時
let m = now.getMinutes();        //分
// let s = now.getSeconds();        //秒

//日時表示文字列の作成
let str = year + "-" + month + "-" + date + "(" + week[day] + ") " + h + ":" + m 
// + ":" + s;
let str2 = month + "月" + date + "日"

//div要素id属性mainを指定
$('#time').html(str);
$("#time2").html(str2);
// console.log(time2)


 // 送信を押すとmsgをfirebaseのchatに入れる
 $("#send").on("click",function(){
     const msg = {
         time : str,
         uname : $("#uname").val( ),
         what : $("#what").val( ),
         when :$("#when").val( ),
         text : $("#text").val( )
     };
     // console.log(msg);
     const newPostRef = push(dbRef);
     set(newPostRef,msg);
     $("#text").val("")
     $("#what").val("")
     $("#when").val("")
 });

 // 送信を押すとp_msgをfirebaseのchat２に入れる
 $("#p_send").on("click",function(){
     const p_msg = {
         time : str,
         uname : $("#p_uname").val( ),
         what : $("#p_what").val( ),
         when :$("#p_when").val( ),
         text : $("#p_text").val( )
     };
     // console.log(msg);
     const p_newPostRef = push(p_dbRef);
     set(p_newPostRef,p_msg);
     $("#p_text").val("")
     $("#p_what").val("")
     $("#p_when").val("")
 });
 
 // enter Actionは消す
 // $("#text").on("keydown",function(e){
 //     console.log(e.key);
 //     if(e.key == "Enter"){
 //      const msg = {
 //         uname : $("#uname").val( ),
 //         text : $("#text").val( )
 //     };
 //     console.log(msg);
 //     const newPostRef = push(dbRef);
 //     set(newPostRef,msg);   
 //     }

// データ取得とoutputに記載する
 onChildAdded(dbRef,function(data){
     const msg = data.val();  // objectを取得
     const key = data.key;  // ユニークキー
     console.log(key)
     const userName = msg.uname;
     const className = `user${(userName.charCodeAt(0) % 4) + 1}`;
     const h = `<div class="chatmsg"><ul class="chat_msg ${className}"><li>${msg.time}</li><li>${msg.uname}</li><li>${msg.what}${msg.when}${msg.text}</li></ul><div class="mbtn"><button class="debtn">×</button><button class="ubtn">▲</button><button class="dobtn">▼</button></div></div>`;
     $("#output").append(h);
     $(".debtn").on("click", function(){
     $(this).parent().parent().remove();
     });
 });
 // メッセージ横の削除ボタンで個別削除したい
 
 



onChildAdded(p_dbRef,function(data){
     const p_msg = data.val();  // objectを取得
     const p_key = data.key;  // ユニークキー
     console.log(p_key)

     const p_userName = p_msg.uname;
     const p_className = `user${(p_userName.charCodeAt(0) % 6) + 1}`;
     const p_h = `<div class="p_chatmsg"><ul class="p_chat_msg ${p_className}"><li>${p_msg.time}</li><li>${p_msg.uname}</li><li>${p_msg.what}${p_msg.when}${p_msg.text}</li></ul><div class="p_mbtn"><button class="p_debtn">×</button><button class="p_ubtn">▲</button><button class="p_dobtn">▼</button></div></div>`;
     $("#p_output").append(p_h);
     $(".p_debtn").on("click", function(){
     $(this).parent().parent().remove();
     });
     
 });
// #debtnが押されたら、同じhに書かれているmsgを削除したい
//  $(document).on("click", "#debtn", function() {
//   $(this).closest("#chatmsg").remove();
// });


//  const chatRef = firebase.database( ).ref("chat")
//  $("#debtn").on('click',function(){
//     const mkey = $(this).parent().data(key);
//     console.log(mkey);
//     dbRef.child(mkey).remove();
//     $(this).parent().remove();
 
//  });

// 全削除設定
$("#adelete").on('click',function(){
 remove(dbRef)
.then(() => {
 console.log("データの削除に成功しました");
})
.catch((error) => {
 console.error("データの削除に失敗しました", error);
});
location.reload();
});

$("#p_adelete").on('click',function(){
 remove(p_dbRef)
.then(() => {
 console.log("データの削除に成功しました");
})
.catch((error) => {
 console.error("データの削除に失敗しました", error);
});
location.reload();
});

// unameが違ったら、背景色を変えたい
