<template>
  <!-- Omaggio a Itachi: una felpa nera con le nuvole rosse bordate di bianco, buttata sull'angolo
       della scrivania. In alto la parte stesa sul piano, vista dall'alto e quindi schiacciata; dal
       bordo pendono il corpo, con la tasca a marsupio, la manica e il cappuccio rovesciato con i
       lacci. Disegnata da zero. Decorativa. Il riquadro è 160 × 135: il bordo davanti della
       scrivania sta a 30. I pezzi sono disegnati dal più lontano al più vicino. -->
  <svg class="hoodie" viewBox="0 0 160 135" aria-hidden="true">
    <defs>
      <path id="hoodie-cloud" d="M0 12A6 6 0 0 1 7 4 8 8 0 0 1 21 2 6.5 6.5 0 0 1 31 7 5.5 5.5 0 0 1 30 18H4A5 5 0 0 1 0 12Z" />
    </defs>

    <!-- La parte stesa sul piano, con le pieghe e una nuvola schiacciata dalla prospettiva. -->
    <path class="hoodie__fabric" d="M10 5C40 -1 108 1 146 7L158 30H2Z" />
    <path class="hoodie__fold" d="M70 8C86 10 104 10 124 15M92 20C108 22 124 22 140 26" />
    <use class="hoodie__cloud" href="#hoodie-cloud" transform="translate(98 9) scale(0.8 0.42)" />

    <!-- La manica, staccata dal corpo, con il polsino. -->
    <path class="hoodie__fabric hoodie__fabric--shade" d="M107 29C118 29 125 31 129 35 133 66 134 100 131 127H113C113 98 111 66 107 29Z" />
    <path class="hoodie__rib" d="M113 121H131.4L131 130H113Z" />
    <path class="hoodie__fold" d="M119 46C121 70 123 92 121 112" />
    <use class="hoodie__cloud" href="#hoodie-cloud" transform="translate(110 72) scale(0.55)" />

    <!-- Il corpo che pende davanti al bordo, con il fondo a costine e la tasca a marsupio. -->
    <path class="hoodie__fabric" d="M4 29C2 58 6 90 14 114 40 121 78 119 102 112 105 88 106 58 106 29Z" />
    <path class="hoodie__rib" d="M14 108C40 115 78 113 102 106L102 112C78 119 40 121 14 114Z" />
    <path class="hoodie__seam" d="M26 104 32 84H82L88 102M32 84C30 92 30 98 31 104M82 84C84 92 84 97 83 103" />
    <path class="hoodie__fold" d="M68 36C70 56 68 72 72 82M94 40C97 62 96 84 98 100" />
    <use class="hoodie__cloud" href="#hoodie-cloud" transform="translate(64 50) scale(1.05)" />
    <use class="hoodie__cloud" href="#hoodie-cloud" transform="translate(40 88) scale(0.75) rotate(-5)" />

    <!-- Il bordo arrotondato dove la felpa piega sul bordo del piano. -->
    <path class="hoodie__roll" d="M2 27C30 24 80 24 108 27L107 34C80 31 30 31 3 34Z" />

    <!-- Il cappuccio rovesciato oltre il bordo, con l'interno scuro, e i lacci che pendono. -->
    <path class="hoodie__hood" d="M12 26C12 12 54 10 62 26 66 46 58 62 37 64 18 62 10 46 12 26Z" />
    <path class="hoodie__hood-inside" d="M21 30C23 20 49 20 53 30 55 45 48 55 37 56 27 55 20 45 21 30Z" />
    <path class="hoodie__cord" d="M31 52C30 66 33 76 29 90M44 52C46 64 43 74 47 86" />
    <circle class="hoodie__tip" cx="29" cy="91" r="1.9" />
    <circle class="hoodie__tip" cx="47" cy="87" r="1.9" />
  </svg>
</template>

<style scoped>
.hoodie {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  filter: drop-shadow(0.5rem 0.6rem 0.5rem rgb(0 0 0 / 55%));
}

.hoodie__fabric {
  fill: #15161b;
}

.hoodie__fabric--shade {
  fill: #0e0f13;
}

.hoodie__roll {
  fill: #23252c;
}

.hoodie__hood {
  fill: #1d1f25;
  stroke: #2c2f37;
  stroke-width: 1;
}

.hoodie__hood-inside {
  fill: #060708;
}

.hoodie__fold {
  fill: none;
  stroke: rgb(255 255 255 / 8%);
  stroke-linecap: round;
  stroke-width: 1.6;
}

.hoodie__seam {
  fill: none;
  stroke: rgb(255 255 255 / 16%);
  stroke-dasharray: 2 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.1;
}

.hoodie__rib {
  fill: #0b0c0f;
}

.hoodie__cloud {
  fill: #c8202a;
  stroke: #f4f1ea;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.hoodie__cord {
  fill: none;
  stroke: #d9d6cf;
  stroke-linecap: round;
  stroke-width: 1.5;
}

.hoodie__tip {
  fill: #9aa0a6;
}
</style>
