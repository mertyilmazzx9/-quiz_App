// Soru verileri
let kaydedilmisSorular = [
    {
        soruMetni: "JavaScript dilinin yaratıcısı kimdir?",
        secenekler: ["Brendan Eich", "Linus Torvalds"],
        dogruCevap: 0,

    },
    {
        soruMetni: "JavaScript hangi yıl piyasaya sürüldü?",
        secenekler: ["1995", "2000"],
        dogruCevap: 0,

    },
    {
        soruMetni: "Hangisi JS frameworklerinden değildir?",
        secenekler: ["React", "Django"],
        dogruCevap: 0,

    },
    {
        soruMetni: "Hangisi doğru CSS açılımıdır?",
        secenekler: ["Cascading Style Sheets", "Colorful Style Sheets"],
        dogruCevap: 0,

    },
    {
        soruMetni: "Hangisi CSS'de zemin rengini değiştirmek için kullanılır?",
        secenekler: ["background-color", "bg-color"],
        dogruCevap: 0,

    },
    {
        soruMetni: "JavaScript hangi kod blokları arasına yazılır?",
        secenekler: ["<script>", "<javascript>"],
        dogruCevap: 0,
    },
    {
        soruMetni: "Hangisi 7.25 sayısını en yakın tamsayıya yuvarlar?",
        secenekler: ["Math.round(7.25)", "Math.rnd(7.25)"],
        dogruCevap: 0,

    },
    {
        soruMetni: "Bir sayfanın başlığı hangi etiket altına yazılır?",
        secenekler: ["title", "body"],
        dogruCevap: 0,

    },
    {
        soruMetni: "Sayfanın meta bilgileri hangi etiket altına yazılır?",
        secenekler: ["head", "body"],
        dogruCevap: 0,

    },
    {
        soruMetni: "Hangi CSS kodu doğrudur?",
        secenekler: ["p{color:black;}", "{p;color;black}"],
        dogruCevap: 0,
    }

  
];

const soruEkle = () => {
    var soruMetni = document.getElementById("soruMetniInput").value;
    //var cevap = document.getElementById("cevapSelect").value;
    var _a = document.getElementById("A_sıkkı").value;
    var _b = document.getElementById("B_sıkkı").value;
    var secenekler = [_a, _b];
    var dogruCevap = document.getElementById("cevapSelect").value;
    var dogruCevap = parseInt(dogruCevap);

    kaydedilmisSorular.push({ soruMetni, secenekler, dogruCevap });

    localStorage.setItem("sorular", JSON.stringify(kaydedilmisSorular));

    document.getElementById("toplam-soru-sayisi").textContent = kaydedilmisSorular.length;

};

document.querySelector("#soruEkleBtn").addEventListener("click", soruEkle);

// Diziyi local storage'a kaydet
localStorage.setItem("sorular", JSON.stringify(kaydedilmisSorular));

// Local storage'dan diziyi getir
let sorular = JSON.parse(localStorage.getItem("sorular"));

// Soru sayacı
let saniye = 300;

//setInterval(function,miliseconds);
//function : Yürütülecek fonksiyonu yazacağımız parametredir.
//miliseconds : Kodlar çalıştırılmadan önce beklenecek olan milisaniye cinsinden zaman miktarıdır. (1 saniye = 1000 milisaniye)
let sayac = setInterval(function () {
    saniye--;
    document.getElementById("saniye").innerText = saniye;
    if (saniye == 0) {
        clearInterval(sayac);
        alert("Süre Bitti!");
    }
}, 1000);


// Başlangıçta ilk soru gösteriliyor
let soruNo = 0;

soruGöster();
document.getElementById("puan").textContent = 0;

// Soru gösterme fonksiyonu
function soruGöster() {
    document.getElementById("soru_sayisii").textContent = soruNo + 1;
    document.getElementById("soru-metni").textContent = kaydedilmisSorular[soruNo].soruMetni;
    document.getElementById("secenek1").textContent = kaydedilmisSorular[soruNo].secenekler[0];
    document.getElementById("secenek2").textContent = kaydedilmisSorular[soruNo].secenekler[1];
    document.querySelector("form").reset();
    document.getElementById("soru-sayisi").textContent = soruNo + 1;
    document.getElementById("toplam-soru-sayisi").textContent = kaydedilmisSorular.length;
}

cevapKontrol();

// Cevap kontrolü
let puan = 0;
function cevapKontrol() {
    document.querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();
      let cevap = document.querySelector("input[name=cevap]:checked").value;
      
      // Sorunun daha önce cevaplandığını kontrol et
      if (!kaydedilmisSorular[soruNo].cevaplandi) {
        if (cevap == kaydedilmisSorular[soruNo].dogruCevap) {
          var par_id = document.getElementById("q" + soruNo);
          par_id.style.backgroundColor = "green";
          let puan = parseInt(document.getElementById("puan").textContent);
          puan += 10;
          document.getElementById("puan").textContent = puan;
        } 
        else {
          var par_id = document.getElementById("q" + soruNo);
          par_id.style.backgroundColor = "red";
        }
  
        // Soruyu cevaplandı olarak işaretle
        kaydedilmisSorular[soruNo].cevaplandi = true;
      }
      
      sonrakiSoru();
    });
  }


// Önceki soru butonu
document.getElementById("onceki-soru").addEventListener("click", function () {
    if (soruNo > 0 && soruNo < kaydedilmisSorular.length) {
        soruNo--;
        soruGöster();

    }
});

// Sonraki soru butonu
document.getElementById("sonraki-soru").addEventListener("click", sonrakiSoru);

// Sonraki soru fonksiyonu
function sonrakiSoru() {
    if (soruNo < kaydedilmisSorular.length - 1) {
        soruNo++;
        soruGöster();
    } else {
        clearInterval(sayac);
        localStorage.removeItem("sorular");
        alert("Tebrikler, sınavı tamamladınız! Toplam Puanınız: " + document.getElementById("puan").textContent);
    }
}
//Soru Güncelleme
function soruGuncelleme() {
    const guncelSoru = prompt("Güncel soruyu girin:");
    const guncelSecenekler = [];
    for (let i = 1; i <= 2; i++) {
        const option = prompt(`Güncel seçenek ${i} girin:`);
        guncelSecenekler.push(option);
    }
    const guncelCevap = prompt("Güncel doğru cevabı girin (eğer 1. seçenek -A- doğru ise 0, 2. seçenek -B- doğru ise 1 değerini giriniz.):");
    if ((guncelCevap !== 1) || (guncelCevap !== 0)){
        alert("Lütfen doğru bir seçenek girin.");

    }
  
    const sonSoru = kaydedilmisSorular[soruNo];
    
    if (guncelSoru && guncelCevap && guncelSecenekler.every(option => option !== null)){
        if ((guncelCevap == 1) || (guncelCevap == 0)){
            sonSoru.soruMetni = guncelSoru;
            sonSoru.dogruCevap = guncelCevap;
            sonSoru.secenekler = guncelSecenekler;
      
            localStorage.setItem("sorular", JSON.stringify(kaydedilmisSorular));
            soruGöster();

    
        }
    
    }
  }