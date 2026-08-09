(function () {
  var STORAGE_KEY = 'bonsainftart-lang';
  var body = document.body;
  var toggle = document.getElementById('lang-toggle');
  var currentLang = 'ja';

  /* =========================================================
     Collection data
     ---------------------------------------------------------
     Keyed by the data-collection attribute on each .card.

     Title, tagline and OpenSea link are read from the card itself,
     so an entry only needs to supply the artwork list. A collection
     with no entry here opens a "coming soon" modal — add a `works`
     array below and it starts rendering, no other change needed.

     `base` is the image path without extension; the modal serves
     <base>.webp with a <base>.png fallback.
     ========================================================= */
  var COLLECTIONS = {
    fortune: {
      meta: { ja: '全4作品 · 各 0.05 WETH', en: '4 works · 0.05 WETH each' },
      works: [
        {
          base: 'images/BONSAI FORTUNE/梅',
          titleJa: '起・梅「兆し」',
          titleEn: 'Ki – Plum: "The Omen"',
          descJa: 'まだ冷たい空気の中、梅だけが先んじて花をひらく。吉祥の物語は、この小さな兆しから始まる。',
          descEn: 'While the air still holds winter’s chill, the plum blooms first. The story of fortune begins with this quiet omen.'
        },
        {
          base: 'images/BONSAI FORTUNE/竹',
          titleJa: '承・竹「しなり」',
          titleEn: 'Sho – Bamboo: "The Bend"',
          descJa: '四季を通じて色を変えぬ竹は、絶えることのない継続の象徴。兆しは、ここで確かな歩みへと変わる。',
          descEn: 'Unchanging through every season, bamboo stands for quiet continuity. Here, the omen becomes a steady stride.'
        },
        {
          base: 'images/BONSAI FORTUNE/金柑',
          titleJa: '転・金柑「実り」',
          titleEn: 'Ten – Kumquat: "The Turning"',
          descJa: '小さな実に宿る「金」の字が、物語に転機と豊かさをもたらす。根はあえて大きく晒し、見えない部分にこそ強さがあることを示す。',
          descEn: 'The character for "gold" hidden in its name brings a turn of fortune. Its roots are left exposed — strength often lives where it isn’t seen.'
        },
        {
          base: 'images/BONSAI FORTUNE/松',
          titleJa: '結・松「常磐」',
          titleEn: 'Ketsu – Pine: "Evergreen"',
          descJa: '兆し、しなり、転機を経て辿り着くのは、常に緑を絶やさぬ松の姿。吉祥の物語は、ここに静かな重みをもって結ばれる。',
          descEn: 'Through omen, resilience, and unexpected fortune, the story arrives here — in the pine that never loses its green. Fortune settles into quiet weight.'
        }
      ]
    },
    seasons: {
      meta: { ja: '全4作品 · 各 0.05 WETH', en: '4 works · 0.05 WETH each' },
      works: [
        {
          base: 'images/BONSAI SEASONS/春',
          titleJa: '起・春「息吹」',
          titleEn: 'Ki – Spring: "First Breath"',
          descJa: '黒松。夜明けの霧を透かして、光が斜めに差し込む。まだ何も始まっていないように見えて、枝先のひとつひとつはすでに光を蓄えている。',
          descEn: 'A black pine at daybreak, mist parting before the light. Nothing has begun yet — and still, every branch tip already holds the sun.'
        },
        {
          base: 'images/BONSAI SEASONS/夏',
          titleJa: '承・夏「緑陰」',
          titleEn: 'Sho – Summer: "Green Shade"',
          descJa: '障子越しのやわらかな光が、壁いっぱいに葉影を落とす。夏を語るのは樹そのものではなく、樹が生んだ影と、そのまわりの静かな余白のほうだ。',
          descEn: 'Soft light through shoji scatters leaf-shadows across the wall. What speaks of summer is not the tree itself, but the shade it casts — and the quiet emptiness around it.'
        },
        {
          base: 'images/BONSAI SEASONS/秋',
          titleJa: '転・秋「燃ゆ」',
          titleEn: 'Ten – Autumn: "Ablaze"',
          descJa: '山紅葉。緑だった葉がことごとく色を変え、床にはすでに数枚が落ちている。極まった美しさは、失われはじめる合図でもある。',
          descEn: 'The mountain maple turns. Every leaf that was green has changed, and a few already rest on the floor — beauty at its height is also the signal of its loss.'
        },
        {
          base: 'images/BONSAI SEASONS/冬',
          titleJa: '結・冬「静寂」',
          titleEn: 'Ketsu – Winter: "Stillness"',
          descJa: '五葉松。雪をまとい、色の失せた庭を背に、樹は動かない。四季をひと巡りして最後に残るのは、色ではなく幹と枝の骨格そのものだ。',
          descEn: 'A white pine under snow, motionless against a garden drained of color. After a full turn of the seasons, what remains is not color but the bare architecture of trunk and branch.'
        }
      ]
    },
    cosmos: {
      meta: { ja: '全4作品 · 各 0.05 WETH', en: '4 works · 0.05 WETH each' },
      works: [
        {
          base: 'images/BONSAI COSMOS/誕生',
          titleJa: '起・誕生「ビッグバン」',
          titleEn: 'Ki – Birth: "The Big Bang"',
          descJa: '星雲の渦のただなかで、幹がねじれながら立ち上がる。宇宙が始まったその瞬間から、樹という形はすでに決まっていたのかもしれない。',
          descEn: 'Amid the swirl of a nebula, a trunk rises and twists. Perhaps the shape of a tree was already decided in the first instant of the universe.'
        },
        {
          base: 'images/BONSAI COSMOS/輝き',
          titleJa: '承・輝き「RADIANCE」',
          titleEn: 'Sho – Radiance',
          descJa: '葉の一枚ずつに光が灯り、やがて星々と見分けがつかなくなる。生まれ落ちた形は、ここで最も強く燃える。',
          descEn: 'Light kindles in every leaf until they can no longer be told apart from the stars. Here, the form that was born burns at its brightest.'
        },
        {
          base: 'images/BONSAI COSMOS/静寂',
          titleJa: '転・静寂「SILENCE」',
          titleEn: 'Ten – Silence',
          descJa: '色が引いていく。残るのは星明かりと、剥き出しの岩の上に立つ一本の影だけ。輝きの後に訪れるのは、終わりではなく静けさだ。',
          descEn: 'The color drains away. What remains is starlight and a single silhouette on bare rock — what follows radiance is not an ending, but stillness.'
        },
        {
          base: 'images/BONSAI COSMOS/永遠',
          titleJa: '結・永遠「ETERNITY」',
          titleEn: 'Ketsu – Eternity',
          descJa: '星さえ見えなくなった白い空の下、舎利をさらした幹だけが岩に残る。時間が通り過ぎたあとに残るのは、生きた証としての木肌そのものだ。',
          descEn: 'Under a pale sky where even the stars have gone, only a trunk of bleached deadwood remains on the rock. What outlasts time is the grain of the wood itself.'
        }
      ]
    },
    abyss: {
      meta: { ja: '全4作品 · 各 0.05 WETH', en: '4 works · 0.05 WETH each' },
      works: [
        {
          base: 'images/BONSAI ABYSS/胎動',
          titleJa: '起・胎動「兆す」',
          titleEn: 'Ki – Stirring',
          descJa: '星雲の奔流が岩を洗う。幹の内側には青い光が走り、根はまだ届かぬ何かを探している。深淵は闇ではなく、始まりの場所だ。',
          descEn: 'A torrent of nebula washes over the rock. Blue light runs inside the trunk, and the roots reach for something not yet found. The abyss is not darkness — it is where things begin.'
        },
        {
          base: 'images/BONSAI ABYSS/孤島',
          titleJa: '承・孤島「独り」',
          titleEn: 'Sho – The Lone Island',
          descJa: '支えるものは何もなく、島は虚空に浮かぶ。遠い星ひとつを頼りに、樹はそこに在り続ける。孤独とは、絶たれることではない。',
          descEn: 'Nothing holds it up; the island floats in the void. By the light of one distant star, the tree simply continues. Solitude is not the same as being cut off.'
        },
        {
          base: 'images/BONSAI ABYSS/沈潜',
          titleJa: '転・沈潜「藍へ」',
          titleEn: 'Ten – Into the Blue',
          descJa: '樹も岩も、同じ藍のなかに沈んでいく。輪郭が溶け、どこまでが樹でどこからが宇宙なのか分からなくなる。境界を失うことが、ここでは深まることだ。',
          descEn: 'Tree and rock sink into a single blue. Outlines dissolve until it is no longer clear where the tree ends and space begins. Here, losing the boundary is how one goes deeper.'
        },
        {
          base: 'images/BONSAI ABYSS/鏡面',
          titleJa: '結・鏡面「還る」',
          titleEn: 'Ketsu – The Mirror',
          descJa: '水面が空を映し、上と下の区別が消える。深淵をどこまでも降りていった先で出会うのは、はじめに見上げた星空そのものだった。',
          descEn: 'The water takes in the sky, and up and down cease to differ. At the far end of the descent lies the very starfield first seen overhead.'
        }
      ]
    },
    canvas: {
      meta: { ja: '全4作品 · 各 0.05 WETH', en: '4 works · 0.05 WETH each' },
      works: [
        {
          base: 'images/BONSAI CANVAS/サクラ',
          titleJa: '起・桜「黄金」',
          titleEn: 'Ki – Cherry: "Gold"',
          descJa: 'クリムトの様式に倣い、金箔の背景に桜を描く。装飾はここで平面となり、樹だけが奥行きを持って立つ。東洋と西洋が出会う、その最初の一枚。',
          descEn: 'Cherry blossoms rendered in the manner of Klimt, against a ground of gold leaf. Ornament flattens into pure surface, and only the tree keeps its depth. The first meeting of East and West.'
        },
        {
          base: 'images/BONSAI CANVAS/柿',
          titleJa: '承・柿「波と富士」',
          titleEn: 'Sho – Persimmon: "Wave and Fuji"',
          descJa: '北斎の様式を借りて、富士と波を背景に。厚く盛られた絵具が波となり、実の重みで枝は垂れる。静かだった画面に動きが生まれる。',
          descEn: 'Fuji and waves in the manner of Hokusai. Thick impasto becomes wave, and branches bow under the weight of fruit; the still surface begins to move.'
        },
        {
          base: 'images/BONSAI CANVAS/藤',
          titleJa: '転・藤「水鏡」',
          titleEn: 'Ten – Wisteria: "Water Mirror"',
          descJa: 'モネの筆致に倣えば、花房も水面も輪郭を失っていく。何が咲いていて何が映っているのか、もはや分けて見る必要はない。',
          descEn: 'Painted in the manner of Monet, both blossom and water lose their edges. What blooms and what is reflected no longer need to be told apart.'
        },
        {
          base: 'images/BONSAI CANVAS/梅',
          titleJa: '結・梅「星月夜」',
          titleEn: 'Ketsu – Plum: "Starry Night"',
          descJa: 'ゴッホの様式で渦を巻く夜空、その中心に白梅が立つ。筆はここで最も激しく、それでも樹の姿は少しも揺らがない。四人の巨匠を巡って、盆栽は盆栽のまま残る。',
          descEn: 'A night sky spiraling in the manner of Van Gogh, with a white plum at its center. Here the brush is at its most violent, yet the tree does not waver. Through four masters, the bonsai remains itself.'
        }
      ]
    },
    mythroot: {
      meta: { ja: '全4作品・0.04〜0.10 WETH', en: '4 works · 0.04-0.10 WETH' },
      works: [
        {
          base: 'images/BONSAI MYTHROOT/「起」— GENESIS ',
          titleJa: '起・産土「うぶすな」',
          titleEn: 'Ki - Genesis: "The Birthing Ground"',
          descJa: 'まだ神話は語られていない。渦巻く光の只中で、根が岩を掴み、立ち上がりがねじれながら天へ向かう。物語は、この最初の一掴みから始まる。',
          descEn: 'No myth has yet been told. In the midst of swirling light, roots seize the rock and the trunk twists upward. The story begins with this first grasp.'
        },
        {
          base: 'images/BONSAI MYTHROOT/「承」— PANTHEON ',
          titleJa: '承・八百万「やおよろず」',
          titleEn: 'Sho - Pantheon: "The Myriad Gods"',
          descJa: '光は幹に移り、痕となって刻まれた。一本が林となり、それぞれの幹が異なる物語を負う。神々は増え、寄り添い、森をなす。',
          descEn: 'The light has moved into the trunks, incised as marks. One tree becomes a grove, each trunk bearing a different story. The gods multiply, gather, and form a forest.'
        },
        {
          base: 'images/BONSAI MYTHROOT/「転」— RAGNAROK',
          titleJa: '転・舎利「しゃり」',
          titleEn: 'Ten - Ragnarok: "The Bleached Bone"',
          descJa: '刻まれたものごと崩れ落ち、色は失われた。残ったのは白く枯れた幹——盆栽が舎利と呼ぶもの。神々の終わりは、骨の美しさとして現れる。',
          descEn: 'All that was inscribed has fallen, and colour has drained away. What remains is the bleached deadwood bonsai calls shari. The end of the gods appears as the beauty of bone.'
        },
        {
          base: 'images/BONSAI MYTHROOT/「結」— REBIRTH ',
          titleJa: '結・花明かり「はなあかり」',
          titleEn: 'Ketsu - Rebirth: "Blossom Light"',
          descJa: '骨から花が咲いた。闇の中で花だけがほのかに明るい。神話は終わらない。ただ、語り直されるのを待っている。',
          descEn: 'From the bone, blossoms open. In the darkness, only the flowers hold a faint light. Myth does not end. It waits to be told again.'
        }
      ]
    },
    geometric: {
      meta: { ja: '全4作品・0.015〜0.035 WETH', en: '4 works · 0.015–0.035 WETH' },
      works: [
        {
          base: 'images/BONSAI GEOMETRIC/「起」— 金×紺',
          titleJa: '起・点「かさなり」',
          titleEn: 'Ki – Halftone: "Overlap"',
          descJa: '円も葉も、同じ点の集まりで描かれる。どこまでが幾何で、どこからが樹なのか分からない。模様木の幹だけが渦を巻き、この一枚が盆栽であることを示している。',
          descEn: 'Circles and foliage are built from the same dots. There is no telling where geometry ends and the tree begins. Only the coiling moyogi trunk marks this as a bonsai.'
        },
        {
          base: 'images/BONSAI GEOMETRIC/「承」— 藍×銀',
          titleJa: '承・格子「へだたり」',
          titleEn: 'Sho – Grid: "The Distance"',
          descJa: '円は格子の文様となり、樹は彫り線の細密描写となった。描く言葉が二つに分かれ、背後の円は樹に触れなくなる。荒れた幹肌が、幾何の整然さと向かい合う。',
          descEn: 'The circles become lattice patterns; the tree becomes engraved line. The two are no longer drawn in one language, and the circles stop touching the tree. Rough bark faces down geometric order.'
        },
        {
          base: 'images/BONSAI GEOMETRIC/「転」— 朱×黒',
          titleJa: '転・朱「ひといろ」',
          titleEn: 'Ten – Crimson: "One Color"',
          descJa: '朱の円がすべてを飲み込み、樹は黒い影となる。細部は消え、幹を走る一筋の白だけが残る。だが背景の点は死んでいない。染まったのは樹のほうだ。',
          descEn: 'Crimson swallows everything and the tree drops to silhouette. Detail is gone. A single white streak down the trunk remains. But the dots behind are still alive — it is the tree that was stained.'
        },
        {
          base: 'images/BONSAI GEOMETRIC/「結」— 桜×灰',
          titleJa: '結・粒「なごり」',
          titleEn: 'Ketsu – Grain: "Afterglow"',
          descJa: '朱はほどけ、淡い粒となって散った。樹は石のような質感を取り戻し、根張りが再び見えている。四作を通じて、樹形は一度も変わっていない。',
          descEn: 'The crimson loosens and scatters into pale grain. The tree recovers a stone-like weight, and the nebari shows again. Across all four, the form never changed.'
        }
      ]
    },
    void: {
      meta: { ja: '全4作品・0.05〜0.08 WETH', en: '4 works · 0.05–0.08 WETH' },
      works: [
        {
          base: 'images/BONSAI VOID/VOID #1 — SILENCE',
          titleJa: '起・静寂「くう」',
          titleEn: 'Ki – Silence: "Nothing Yet"',
          descJa: '画面の八割が、何もない。樹は右下にひとつ、石の上に置かれたように立つ。地面との境も曖昧で、まだどこにも根を下ろしていないように見える。',
          descEn: 'Eight-tenths of the frame holds nothing. The tree sits low and right, set on a stone as if placed there. Even the ground beneath it blurs — nothing has taken root yet.'
        },
        {
          base: 'images/BONSAI VOID/VOID #2 — BREATH  間',
          titleJa: '承・間「のろし」',
          titleEn: 'Sho – Breath: "Something Enters"',
          descJa: '白が反転して黒になり、そこへ煙が立ち上る。細枝は霜のように白く光り、鉢の輪郭がはっきりと現れる。何もなかった場所に、最初の合図が上がる。',
          descEn: 'White inverts to black, and smoke begins to rise. Fine branches glint like frost, and the rim of the pot comes clearly into view. In a place that held nothing, a first signal goes up.'
        },
        {
          base: 'images/BONSAI VOID/VOID #3 — ASH  灰',
          titleJa: '転・灰「すむ」',
          titleEn: 'Ten – Ash: "Burned Clear"',
          descJa: '葉がすべて落ち、枝だけが残った。燃えたあとの澄んだ空気のなかで、枝の一本一本が向こう側まで見通せる。何も隠すものがなくなった姿。',
          descEn: 'Every leaf is gone; only branches remain. In the clear air after burning, each branch can be followed all the way through. Nothing is left to hide behind.'
        },
        {
          base: 'images/BONSAI VOID/VOID #4 — TRACE  痕',
          titleJa: '結・痕「にじむ」',
          titleEn: 'Ketsu – Trace: "What Stays"',
          descJa: '樹は墨で刷られたひとつの黒い塊となり、根元が滲んで地面と溶け合う。背景は掠れた紙のようだ。空虚がいちばん薄いこの一枚で、樹は最も濃く残る。',
          descEn: 'The tree becomes a single black mass, printed in ink, its base bleeding into the ground. The background is worn paper. Where the void is thinnest, the tree stands darkest.'
        }
      ]
    },
    'tree-of-itself': {
      meta: { ja: '全4作品・0.02〜0.04 WETH', en: '4 works · 0.02–0.04 WETH' },
      works: [
        {
          base: 'images/TREE OF ITSELF/HINOKI  檜',
          titleJa: '起・檜「かみのき」',
          titleEn: 'Ki – Hinoki: "The Sacred Origin"',
          descJa: '社殿を背に、白木のブロックが積み上がって一本の樹になる。檜は宮大工が神域に使う材だ。根張りが大きく広がり、幹は模様木の渦を巻いて立ち上がる。',
          descEn: 'Blocks of pale wood stack into a tree, a shrine hall behind it. Hinoki is the timber temple carpenters reserve for sacred ground. The nebari spreads wide, and the trunk rises in the coil of moyogi.'
        },
        {
          base: 'images/TREE OF ITSELF/KUSUNOKI  楠',
          titleJa: '承・楠「みとどけ」',
          titleEn: 'Sho – Kusunoki: "The Ancient Witness"',
          descJa: '飴色に艶めくブロック。株立ちで、複数の幹が同じ根元から空へ分かれていく。楠は御神木として千年を生きる樹。森の奥で、ただ立って見つづけてきた。',
          descEn: 'Amber blocks with a worn gloss. In kabudachi form, several trunks divide skyward from one root. The camphor is a shrine tree that lives a thousand years. Deep in the forest, it has done nothing but stand and watch.'
        },
        {
          base: 'images/TREE OF ITSELF/ケヤキ（欅）',
          titleJa: '転・欅「ねばり」',
          titleEn: 'Ten – Keyaki: "The Unbreakable"',
          descJa: '赤黒く焼けたブロックが、四方へ均等に枝を伸ばす。背後は炎。欅は硬いのではなく粘る材で、折れずにたわむからこそ寺社の梁になる。燃える前で、立っている。',
          descEn: 'Blocks burnt red-black reach out evenly on all sides. Behind them, fire. Zelkova is not hard so much as pliant — it bends without breaking, which is why it becomes temple beams. It stands with the fire at its back.'
        },
        {
          base: 'images/TREE OF ITSELF/クロマツ（黒松）',
          titleJa: '結・黒松「ひとり」',
          titleEn: 'Ketsu – Kuromatsu: "The Lone Scholar"',
          descJa: '黒いブロック、白い余白、遠くにかすむ山。文人木は装飾を削ぎ落とした様式だ。四作のうちこの一枚だけが、背負うものを何も持たずに立っている。',
          descEn: 'Black blocks, white space, a mountain fading in the distance. Bunjin is the style that strips ornament away. Of the four, only this one stands carrying nothing behind it.'
        }
      ]
    },
    'stone': {
      meta: { ja: '全4作品・0.05〜0.08 WETH', en: '4 works · 0.05–0.08 WETH' },
      works: [
        {
          base: 'images/BONSAI STONE/＃１',
          titleJa: '起・土「たよる」',
          titleEn: 'Ki – Earth: "Still Fed"',
          descJa: '根は石を越え、その下の土へ届いている。\n石はまだ通り道にすぎない。\nこの樹は、失うものをまだ知らない。',
          descEn: 'The roots cross the stone and reach the soil beneath it.\nThe rock is still only a path.\nThis tree does not yet know what it will lose.'
        },
        {
          base: 'images/BONSAI STONE/＃２',
          titleJa: '承・岩「にぎる」',
          titleEn: 'Sho – Grip: "Only Stone Now"',
          descJa: '土がない。\n根は石の窪みをたどり、割れ目を探し、そこに指をかける。\n握るのではなく、握るしかない。',
          descEn: 'No soil.\nThe roots follow every hollow, find every crack, and set their fingers there.\nNot holding on by choice. Holding on because there is nothing else.'
        },
        {
          base: 'images/BONSAI STONE/＃３',
          titleJa: '転・骨「まじる」',
          titleEn: 'Ten – Fusion: "Wood Turns Stone"',
          descJa: '幹が白く枯れ、ねじれ、石の縞と見分けがつかなくなる。\nどこまでが木で、どこからが石か。\n掴んでいたはずのものと、いつのまにか同じものになっている。',
          descEn: 'The trunk bleaches, twists, and blurs into the grain of the rock.\nWhere does the wood end and the stone begin?\nWhat it once gripped, it has quietly become.'
        },
        {
          base: 'images/BONSAI STONE/＃４',
          titleJa: '結・苔「なじむ」',
          titleEn: 'Ketsu – Moss: "Stone Time"',
          descJa: '苔が石を覆い、根を覆い、境目を埋めていく。\n石の時間はゆっくりで、樹の時間はそれより速い。\nその差が、もう見えない。',
          descEn: 'Moss covers the stone, covers the roots, fills the seam between them.\nStone keeps slow time. The tree keeps faster time.\nThe gap is no longer visible.'
        }
      ]
    },
    'monyo': {
      meta: { ja: '全4作品・各 0.05 WETH', en: '4 works · 0.05 WETH each' },
      works: [
        {
          base: 'images/MONYO/起',
          titleJa: '起・麻「のびる」',
          titleEn: 'Ki – Hemp: "Grown As Asked"',
          descJa: '麻の葉は、産着の文様。まっすぐ健やかに育つようにと、生まれたばかりの子に着せた祈りだった。鉢がそう願い、樹は直幹で応えた。傷は、まだどこにもない。',
          descEn: 'Asanoha is the pattern of a newborn\'s first garment — a wish that the child grow straight and strong. The pot made that wish, and the tree answered with an unbroken vertical trunk. Nothing here has been hurt yet.'
        },
        {
          base: 'images/MONYO/承',
          titleJa: '承・波「くりかえす」',
          titleEn: 'Sho – Wave: "Peace Repeats"',
          descJa: '青海波は、寄せては返す波の反復。穏やかさとは変化がないことではなく、同じものが繰り返し戻ってくることだ。幹の付け根に、小さなウロがひとつ空いた。それでも樹は、去年と同じ形に枝を張る。',
          descEn: 'Seigaiha repeats one wave, over and over. Calm is not the absence of change but the return of the same thing. A small hollow has opened at the base of the trunk. The tree spreads its branches in the same shape it held last year.'
        },
        {
          base: 'images/MONYO/転',
          titleJa: '転・蔓「ねじれる」',
          titleEn: 'Ten – Vine: "Scars Are the Proof"',
          descJa: '唐草は、伸びて絡んで途切れない蔓の文様。意味は生命力。この樹は幹がねじれ、白い舎利が露わになっている。最も暗い光の中で、最も傷んだ姿で、鉢は生命力を語る。生きていくということは決して無傷ではない。その傷が、生きた証だ。',
          descEn: 'Karakusa is the vine that reaches, tangles, and never breaks — the pattern of vitality. This trunk has twisted, and pale deadwood shows through the bark. In the dimmest light, in the most damaged form, the pot speaks of vitality. To live is never to remain unhurt. The scars are the proof of a life lived.'
        },
        {
          base: 'images/MONYO/結',
          titleJa: '結・環「つながる」',
          titleEn: 'Ketsu – Ring: "The Circle Becomes a Bond"',
          descJa: '七宝は、円が重なり合って途切れない文様。縁が続くようにという願い。ねじれた幹は治らないまま、花をつけた。円が縁となり、すべてを繋いでいく。',
          descEn: 'Shippo is a lattice of overlapping circles that never breaks — a wish that connection continues. The twisted trunk never straightened, and still it flowered. The circle becomes a bond, and the bond carries everything onward.'
        }
      ]
    },
    'manyo': {
      meta: { ja: '全4作品・各 0.05 WETH', en: '4 works · 0.05 WETH each' },
      works: [
        {
          base: 'images/MANYO/馬酔木',
          titleJa: '馬酔木 — 咲きそむ希望',
          titleEn: 'Ashibi — First Sign of Spring',
          descJa: '万葉集に詠まれた花。千年以上前、誰かがこの白い鈴を見て歌にした。まだ咲ききってはいない。歌人が詠んだのも、これから咲くものだった。始まりとは、満ちる前の状態のことだ。',
          descEn: 'A flower named in the Man\'yoshu. More than a thousand years ago, someone saw these white bells and made a poem of them. It has not fully opened. What the poet wrote of was also something still to come. A beginning is the state before fullness.'
        },
        {
          base: 'images/MANYO/藤',
          titleJa: '藤 — 溢れる生命',
          titleEn: 'Fuji — Overflowing Life',
          descJa: '藤は垂れる。花房の重みが枝を引き下げ、樹形そのものを決めてしまう。盆栽で懸崖が谷へ落ちる姿と、根は同じだ。溢れるとは、支えきれないほど持っているということ。',
          descEn: 'Wisteria hangs. The weight of the racemes pulls the branches down and decides the shape of the tree itself. It shares its root with the cascade style, falling toward the valley. To overflow is to hold more than one can support.'
        },
        {
          base: 'images/MANYO/撫子',
          titleJa: '撫子 — 可憐と芯',
          titleEn: 'Nadeshiko — Delicate and Strong',
          descJa: 'ここに幹はない。細い茎が寄り集まっているだけだ。盆栽の分類には収まらないかもしれない。だがこれは万葉集の世界の花であり、日本人が千年見つめてきた象徴のひとつだ。樹形の物差しの外側に、そういう美しさがある。可憐に見えるものが弱いとは限らない。芯は、太さのことではない。',
          descEn: 'There is no trunk here. Only thin stems, gathered close. It may not fit the categories of bonsai. But this is a flower of the Man\'yoshu, one of the symbols this country has looked at for a thousand years. Some beauty lives outside the measure of tree form. What looks delicate is not always weak. A core is not a matter of thickness.'
        },
        {
          base: 'images/MANYO/萩',
          titleJa: '萩 — 移ろいと余韻',
          titleEn: 'Hagi — The Lingering Season',
          descJa: '萩は散る花として詠まれた。万葉集で最も多く詠まれた植物でもある。千年前の歌人が惜しんだのは、この散り際だった。余韻とは、花が去った後に残るもの。そして次の春に、また同じ花が咲く。',
          descEn: 'Hagi was written of as a flower that falls. It is also the plant most often named in the Man\'yoshu. What the poets of a thousand years ago regretted was this moment of scattering. A lingering is what remains after the flower has gone. And in the next spring, the same flower opens again.'
        }
      ]
    },
    'ink': {
      meta: { ja: '全4作品・0.06〜0.10 WETH', en: '4 works · 0.06–0.10 WETH' },
      works: [
        {
          base: 'images/BONSAI INK/＃１',
          titleJa: 'INK #1 — MOUNTAIN / 峰',
          titleEn: 'INK #1 — MOUNTAIN / 峰',
          descJa: '盆栽の原点は、自然の中にある。断崖の上に一本の松が立っている。人はそこへ行けない。ただ見上げるだけだ。この光景に目を奪われた誰かが、いつかそれを手元に置きたいと願った。すべてはそこから始まった。',
          descEn: 'The origin of bonsai lies in nature. A single pine stands on a cliff edge. No one can reach it. One can only look up. Someone who was struck by this sight one day wished to hold it close. Everything began there.'
        },
        {
          base: 'images/BONSAI INK/＃２',
          titleJa: 'INK #2 — RIVER / 流',
          titleEn: 'INK #2 — RIVER / 流',
          descJa: '水が動いている。山は動かないが、川は動く。動くものは目を捉える。岩の間を落ちる白い流れも、そこに根を張る松も、墨の濃淡だけで描かれている。輪郭線はどこにもない。自然に輪郭線はないからだ。',
          descEn: 'Water is moving. The mountain does not move, but the river does. What moves catches the eye. The white fall between the rocks and the pine rooted beside it are drawn only in gradations of ink. There is no outline anywhere. Nature has no outlines.'
        },
        {
          base: 'images/BONSAI INK/＃３',
          titleJa: 'INK #3 — MIST / 霞',
          titleEn: 'INK #3 — MIST / 霞',
          descJa: '霞がすべてを消した。山も、水も、地面すら見えない。残ったのは一本の裸の樹だけだ。ここで初めて、風景から樹が切り離される。人が樹そのものを見た瞬間。盆栽という文化は、おそらくこの視線から生まれた。',
          descEn: 'The mist has erased everything. The mountain, the water, even the ground is gone. What remains is one bare tree. Here, for the first time, the tree is cut away from the landscape. The moment a person saw the tree itself. The culture of bonsai was probably born from this way of looking.'
        },
        {
          base: 'images/BONSAI INK/＃４',
          titleJa: 'INK #4 — STONE / 磐',
          titleEn: 'INK #4 — STONE / 磐',
          descJa: '根が岩を掴んでいる。土ではなく、岩そのものを。後の世で、この姿は石付き・石上と呼ばれ、様式になった。自然にあったものが、型になった。水墨画の全盛から数百年、人はまだ同じ光景を鉢の上に再現しようとしている。',
          descEn: 'The roots grip the rock. Not soil — the rock itself. In later ages this form was given names and became a style. What existed in nature became a form to be made. Centuries after the great age of ink painting, people are still trying to rebuild this same scene on a tray.'
        }
      ]
    }
  };

  /* ---------- Language ---------- */

  /* Suffix on data-ja-* / data-en-* -> attribute it drives. */
  var TRANSLATED_ATTRS = { label: 'aria-label', alt: 'alt' };

  function translate(root, lang) {
    root.querySelectorAll('[data-ja][data-en]').forEach(function (el) {
      el.innerHTML = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ja');
    });

    Object.keys(TRANSLATED_ATTRS).forEach(function (suffix) {
      root.querySelectorAll('[data-ja-' + suffix + '][data-en-' + suffix + ']').forEach(function (el) {
        el.setAttribute(
          TRANSLATED_ATTRS[suffix],
          el.getAttribute('data-' + (lang === 'en' ? 'en' : 'ja') + '-' + suffix)
        );
      });
    });
  }

  function applyLang(lang) {
    currentLang = lang === 'en' ? 'en' : 'ja';
    body.classList.remove('lang-ja', 'lang-en');
    body.classList.add('lang-' + currentLang);
    document.documentElement.lang = currentLang;
    translate(document, currentLang);
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  applyLang(saved === 'en' ? 'en' : 'ja');

  toggle.addEventListener('click', function () {
    var next = currentLang === 'ja' ? 'en' : 'ja';
    applyLang(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
  });

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  function closeNav() {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeNav();
  });

  /* ---------- Collection modal ---------- */
  var modal = document.getElementById('collection-modal');
  var grid = document.querySelector('.collection-grid');
  if (!modal || !grid) return;

  var dialog = modal.querySelector('.modal-dialog');
  var elEyebrow = document.getElementById('modal-eyebrow');
  var elTitle = document.getElementById('modal-title');
  var elTagline = document.getElementById('modal-tagline');
  var elMeta = document.getElementById('modal-meta');
  var elBody = document.getElementById('modal-body');
  var elOpenSea = document.getElementById('modal-opensea');
  var closeBtn = modal.querySelector('.modal-close');
  var lastFocused = null;

  function setBilingual(el, ja, en) {
    el.setAttribute('data-ja', ja);
    el.setAttribute('data-en', en);
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function buildWork(work, index) {
    var row = document.createElement('article');
    row.className = 'modal-work';

    var thumb = document.createElement('div');
    thumb.className = 'modal-work-thumb';

    var picture = document.createElement('picture');
    var source = document.createElement('source');
    /* Spaces must be percent-encoded: srcset splits each candidate on
       whitespace, so a raw space would be parsed as a size descriptor.
       encodeURI() leaves '#' untouched since it's a valid URI reserved
       character, but in a filename it gets read as a fragment marker,
       so it needs a manual %23 replacement afterward. */
    source.setAttribute('srcset', encodeURI(work.base + '.webp').replace(/#/g, '%23'));
    source.setAttribute('type', 'image/webp');

    var img = document.createElement('img');
    img.src = encodeURI(work.base + '.png').replace(/#/g, '%23');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.setAttribute('data-ja-alt', work.titleJa);
    img.setAttribute('data-en-alt', work.titleEn);
    img.alt = work.titleJa;

    picture.appendChild(source);
    picture.appendChild(img);
    thumb.appendChild(picture);

    var text = document.createElement('div');
    text.className = 'modal-work-text';

    var num = document.createElement('p');
    num.className = 'modal-work-num';
    num.textContent = pad(index + 1);

    var title = document.createElement('h3');
    title.className = 'modal-work-title';
    setBilingual(title, work.titleJa, work.titleEn);

    /* The other language, kept visible underneath so both readings show. */
    var subtitle = document.createElement('p');
    subtitle.className = 'modal-work-subtitle';
    setBilingual(subtitle, work.titleEn, work.titleJa);

    var desc = document.createElement('p');
    desc.className = 'modal-work-desc';
    setBilingual(desc, work.descJa, work.descEn);

    text.appendChild(num);
    text.appendChild(title);
    text.appendChild(subtitle);
    text.appendChild(desc);

    row.appendChild(thumb);
    row.appendChild(text);
    return row;
  }

  function buildComingSoon() {
    var wrap = document.createElement('div');
    wrap.className = 'modal-empty';

    var mark = document.createElement('span');
    mark.className = 'modal-empty-mark';
    mark.textContent = '間';

    var text = document.createElement('p');
    text.className = 'modal-empty-text';
    setBilingual(
      text,
      '作品ごとの解説は準備中です。<br>OpenSeaでは全作品をご覧いただけます。',
      'Artwork notes are coming soon.<br>All pieces are viewable on OpenSea.'
    );

    wrap.appendChild(mark);
    wrap.appendChild(text);
    return wrap;
  }

  function render(card) {
    var data = COLLECTIONS[card.getAttribute('data-collection')];
    var num = card.querySelector('.card-num');
    var title = card.querySelector('.card-title');
    var desc = card.querySelector('.card-desc');
    var link = card.querySelector('.card-link');

    elEyebrow.textContent = num ? 'COLLECTION ' + num.textContent.trim() : '';
    elTitle.textContent = title ? title.textContent.trim() : '';

    if (desc) {
      setBilingual(elTagline, desc.getAttribute('data-ja'), desc.getAttribute('data-en'));
    }
    if (link) {
      elOpenSea.href = link.getAttribute('href');
    }

    if (data && data.meta) {
      setBilingual(elMeta, data.meta.ja, data.meta.en);
    } else {
      elMeta.removeAttribute('data-ja');
      elMeta.removeAttribute('data-en');
      elMeta.textContent = '';
    }

    elBody.textContent = '';
    if (data && data.works && data.works.length) {
      data.works.forEach(function (work, i) {
        elBody.appendChild(buildWork(work, i));
      });
    } else {
      elBody.appendChild(buildComingSoon());
    }

    translate(modal, currentLang);
  }

  function focusable() {
    return Array.prototype.filter.call(
      dialog.querySelectorAll('a[href], button:not([disabled])'),
      function (el) { return el.offsetParent !== null; }
    );
  }

  function openModal(card) {
    /* Clicking the card body doesn't move focus anywhere, so activeElement is
       still <body>. Fall back to the card's own trigger, otherwise closing
       would drop focus back to the top of the page. */
    var active = document.activeElement;
    lastFocused = card.contains(active) ? active : card.querySelector('.card-detail');
    render(card);
    modal.classList.add('is-open');
    body.classList.add('modal-open');
    modal.scrollTop = 0;
    closeBtn.focus();
  }

  function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  /* Give every card a keyboard-reachable trigger. Built here rather than in
     the markup so the affordance never shows when the modal can't open. */
  grid.querySelectorAll('.card[data-collection]').forEach(function (card) {
    var link = card.querySelector('.card-link');
    if (!link) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card-detail';
    btn.setAttribute('aria-haspopup', 'dialog');
    setBilingual(btn, '作品を見る →', 'View artworks →');
    card.insertBefore(btn, link);
  });
  translate(grid, currentLang);

  grid.addEventListener('click', function (e) {
    if (e.target.closest('.card-link')) return; // let the OpenSea link through
    var card = e.target.closest('.card[data-collection]');
    if (card) openModal(card);
  });

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-modal-close]')) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key !== 'Tab') return;

    var items = focusable();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (!dialog.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    }
  });
})();
