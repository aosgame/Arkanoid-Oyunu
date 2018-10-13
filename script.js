$(function(){//sayfa tamamen yüklendikten sonra çalışacak

    var svg=Pablo('#ground').svg({//yükseklik ve genişlik ayarı svg için
        width:1100,
        height:750
    });

    var top;//topun özelliklerini tutar
    var topX=550;//topun x noktası
    var topY=500;//topun y noktası
    var topR=10;//topun yarıçapı

    var alanX1=0;
    var alanX2=1100;

    var alanY1=0;
    var alanY2=750;

    top=svg.circle({//daire oluşturmaya yarayan metot
        cx:topX,
        cy:topY,
        r:topR,
        fill:'#060'
    });

    var yon=[+1,-1];//yön değerleri aynı zamanda topun hızını belirler.

    var yonX=yon[Math.floor(Math.random()*2)]//0  yada 1 değerini alacak
    var yonY=yon[Math.floor(Math.random()*2)];

    var yay;
    var yayX=500;
    var yayY=700;

    yay=svg.rect({//yayı oluşturan dikdörtgen
        x:yayX,
        y:yayY,
        width:240,height:40,
        fill:'#FF7A4D'
    });

    //console.log(yay);

    var w=85;
    var h=25;

    var tuglaArray=new Array();

    for(var tY=50;tY<350;tY=tY+45){
        for(var tX=35;tX<1065;tX=tX+105){
            var randomCiz=Math.floor(Math.random()*2);
            if(randomCiz==1)
            tuglaOlustur(tX,tY);
        }
    }

    var guc=1;
    
    setInterval(function(){

        top.attr({cx:topX,cy:topY});//svg nesnesinin attributelerini değiştirmeyi sağlar
        // top.remove();//svg nesnelerini silmeyi sağlar
        // top=svg.circle({//daire oluşturmaya yarayan metot
        //     cx:topX,
        //     cy:topY,
        //     r:topR,
        //     fill:'#060'
        // });

        
        topX=topX+yonX;
        topY=topY+yonY;

        // x=Math.random();//1 ve 1 arası değer üretir.
        // x=Math.floor(Math.random()*10);//0 ile 9 arasında değer üretir
        // x=Math.floor(Math.random()*10)+1;//1 ile 10 arasında değer üretir
        // console.log(x);

        if(topX==alanX1+10||topX==alanX2-10)//x ekseni sınırlarıyla çarpışma
        {
            yonX=yonX*-1;
        }

        if(topY==alanY1+10||topY==alanY2-10)//y ekseni sınırlarıyla çarpışma
        {
            yonY=yonY*-1;
        }

        if(topY==690 && (topX>yayX-10 && topX<yayX+250))//yay ile çarpışma
        {
            yonY=yonY*-1;
        }

        // //tuğlanın üst ve alt sınırlarıyla çarpışma
        // if((guc>0)&&((topY==285&&(topX>290&&topX<395))||(topY==240&&(topX>290&&topX<395))))
        // {
        //     yonY=yonY*-1;
        //     guc=guc-1;
        //     if(guc==0)
        //     tugla.remove();
            
        // }

        // //tuğlanın sol ve sağ sınırlarıyla çarpışma
        // if((guc>0)&&(topX==290&&(topY>240&&topY<285))||(topX==395&&(topY>240&&topY<285)))
        // {
        //     yonX=yonX*-1;
        //     tugla.remove();
        //     guc=0;
        // }


        for(var i=0;i<tuglaArray.length;i++)
        {
            if((tuglaArray[i].guc>0) && ((topY==tuglaArray[i].y+h+topR && (topX>tuglaArray[i].x-topR && topX<tuglaArray[i].x+w+topR))||(topY==tuglaArray[i].y-topR && (topX>tuglaArray[i].x-topR && topX<tuglaArray[i].x+w+topR)))){
                yonY=yonY*-1;
                tuglaArray[i].sanal.remove();
                tuglaArray[i].guc=0;
            }

            if((tuglaArray[i].guc>0) && ((topX==tuglaArray[i].x-topR && (topY>tuglaArray[i].y-topR && topY<tuglaArray[i].y+h+topR))||(topX==tuglaArray[i].x+w+topR && (topY>tuglaArray[i].y-topR && topY<tuglaArray[i].y+h+topR)))){
                yonX=yonX*-1;
                tuglaArray[i].sanal.remove();
                tuglaArray[i].guc=0;
            }
        }
        
        

    },2);

        $(document).mousemove(function(e){//mouse hareketleri
            yayX=e.clientX;

            if(yayX<860)//yayX 860dan büyük olduğu durumlarda hareket etmez
                yay.attr({x:yayX});
        })

        $(document).keydown(function(event){//klavye tuşlarına basılma anı
            //37 sol---  38 yukarı  ----39 sağ  ----  40 aşağı
            //32 space ----  13 enter  ----   27  esc
            var code=event.which;

            if(code==37){//sol yön tuşuna basıldı
                yayX=yayX-5;

                if(yayX>0)//yayX 0dan küçük olduğu durumlarda hareket etmez
                    yay.attr({x:yayX});
            }

            if(code==39){//sağ yön tuşuna basıldı
                yayX=yayX+5;

                if(yayX<860)//yayX 860dan büyük olduğu durumlarda hareket etmez
                    yay.attr({x:yayX});
            }
            
            
        })

        var tugla;

        function tuglaOlustur(tx,ty)//tuğla oluşturan fonksiyon
        {
            var sanalTugla=svg.rect({
                x:tx,
                y:ty,
                width:w,height:h,
                fill:'#FF2626'
            })

            var tugla={
                x:tx,
                y:ty,
                guc:1,
                sanal:sanalTugla
            }

            tuglaArray.push(tugla);
            //unshift();dizinin başına eleman ekler
            //splice(0,1);0. indexi silme işlemini yapar
            //pop();dizinin son elemanını siler
            //shift();dizinin ilk elemanını siler
            
        }
    


})