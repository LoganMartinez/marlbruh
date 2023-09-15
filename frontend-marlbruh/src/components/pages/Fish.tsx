import { Text } from "@mantine/core";

const Fish = () => {
  const htmlStr = `
  <h1 class="chapter7" id="c04">CHAPTER FOUR</h1>
  <h1 class="subchapter">SHADOWLAND</h1>
  <p class="nonindent">Danny weakened and went up for his milk and cookies at quarter past four. He gobbled them while looking out the window, then went in to kiss his mother, who was lying down. She suggested that he stay in and watch <i>Sesame Street</i>—the time would pass faster—but he shook his head firmly and went back to his place on the curb.</p>
  <p class="indent">Now it was five o’clock, and although he didn’t have a watch and couldn’t tell time too well yet anyway, he was aware of passing time by the lengthening of the shadows, and by the golden cast that now tinged the afternoon light.</p>
  <p class="indent"><span id="page37"/>Turning the glider over in his hands, he sang under his breath: “Skip to m Lou, n I don’t care … skip to m Lou, n I don’t care … my master’s gone away … Lou, Lou, skip to m Lou …”</p>
  <p class="indent">They had sung that song all together at the Jack and Jill Nursery School he had gone to back in Stovington. He didn’t go to nursery school out here because Daddy couldn’t afford to send him anymore. He knew his mother and father worried about that, worried that it was adding to his loneliness (and even more deeply, unspoken between them, that Danny blamed them), but he didn’t really want to go to that old Jack and Jill anymore. It was for babies. He wasn’t quite a big kid yet, but he wasn’t a baby anymore. Big kids went to the big school and got a hot lunch. First grade. Next year. This year was someplace between being a baby and a real kid. It was all right. He did miss Scott and Andy—mostly Scott—but it was still all right. It seemed best to wait alone for whatever might happen next.</p>
  <p class="indent">He understood a great many things about his parents, and he knew that many times they didn’t like his understandings and many other times refused to believe them. But someday they would have to believe. He was content to wait.</p>
  <p class="indent">It was too bad they couldn’t believe more, though, especially at times like now. Mommy was lying on her bed in the apartment, just about crying she was so worried about Daddy. Some of the things she was worried about were too grown-up for Danny to understand—vague things that had to do with security, with Daddy’s <i>self-image,</i> <span id="page38"/>feelings of guilt and anger and the fear of what was to become of them—but the two main things on her mind right now were that Daddy had had a breakdown in the mountains <i>(then why doesn’t he call?)</i> or that Daddy had gone off to do the Bad Thing. Danny knew perfectly well what the Bad Thing was since Scotty Aaronson, who was six months older, had explained it to him. Scotty knew because his daddy did the Bad Thing, too. Once, Scotty told him, his daddy had punched his mom right in the eye and knocked her down. Finally, Scotty’s dad and mom had gotten a <span class="small">DIVORCE</span> over the Bad Thing, and when Danny had known him, Scotty lived with his mother and only saw his daddy on weekends. The greatest terror of Danny’s life was <span class="small">DIVORCE</span>, a word that always appeared in his mind as a sign painted in red letters which were covered with hissing, poisonous snakes. In <span class="small">DIVORCE</span>, your parents no longer lived together. They had a tug of war over you in a court (tennis court? badminton court? Danny wasn’t sure which or if it was some other, but Mommy and Daddy had played both tennis and badminton at Stovington, so he assumed it could be either) and you had to go with one of them and you practically never saw the other one, and the one you were with could marry somebody you didn’t even know if the urge came on them. The most terrifying thing about <span class="small">DIVORCE</span> was that he had sensed the word—or concept, or whatever it was that came to him in his understandings—floating around in his own parents’ heads, sometimes diffuse and relatively distant, sometimes as thick and obscuring and frightening <span id="page39"/>as thunderheads. It had been that way after Daddy punished him for messing the papers up in his study and the doctor had to put his arm in a cast. That memory was already faded, but the memory of the <span class="small">DIVORCE</span> thoughts was clear and terrifying. It had mostly been around his mommy that time, and he had been in constant terror that she would pluck the word from her brain and drag it out of her mouth, making it real. <span class="small">DIVORCE</span>. It was a constant undercurrent in their thoughts, one of the few he could always pick up, like the beat of simple music. But like a beat, the central thought formed only the spine of more complex thoughts, thoughts he could not as yet even begin to interpret. They came to him only as colors and moods. Mommy’s <span class="small">DIVORCE</span> thoughts centered around what Daddy had done to his arm, and what had happened at Stovington when Daddy lost his job. That boy. That George Haffield who got pissed off at Daddy and put the holes in their bug’s feet. Daddy’s <span class="small">DIVORCE</span> thoughts were more complex, colored dark violet and shot through with frightening veins of pure black. He seemed to think they would be better off if he left. That things would stop hurting. His daddy hurt almost all the time, mostly about the Bad Thing. Danny could almost always pick that up too: Daddy’s constant craving to go into a dark place and watch a color TV and eat peanuts out of a bowl and do the Bad Thing until his brain would be quiet and leave him alone.</p>
  <p class="indent">But this afternoon his mother had no need to worry and he wished he could go to her and tell her that. The bug had not broken down. Daddy was not off somewhere <span id="page40"/>doing the Bad Thing. He was almost home now, put-putting along the highway between Lyons and Boulder. For the moment his daddy wasn’t even thinking about the Bad Thing. He was thinking about … about …</p>
  <p class="indent">Danny looked furtively behind him at the kitchen window. Sometimes thinking very hard made something happen to him. It made things—real things—go away, and then he saw things that weren’t there. Once, not long after they put the cast on his arm, this had happened at the supper table. They weren’t talking much to each other then. But they were thinking. Oh yes. The thoughts of <span class="small">DIVORCE</span> hung over the kitchen table like a cloud full of black rain, pregnant, ready to burst. It was so bad he couldn’t eat. The thought of eating with all that black <span class="small">DIVORCE</span> around made him want to throw up. And because it had seemed desperately important, he had thrown himself fully into concentration and something had happened. When he came back to real things, he was lying on the floor with beans and mashed potatoes in his lap and his mommy was holding him and crying and Daddy had been on the phone. He had been frightened, had tried to explain to them that there was nothing wrong, that this sometimes happened to him when he concentrated on understanding more than what normally came to him. He tried to explain about Tony, who they called his “invisible playmate.”</p>
  <p class="indent">His father had said: “He’s having a Ha Loo Sin Nation. He seems okay, but I want the doctor to look at him anyway.”</p>
  <p class="indent">After the doctor left, Mommy had made him promise <span id="page41"/>to never do that again, to <i>never</i> scare them that way, and Danny had agreed. He was frightened himself. Because when he had concentrated his mind, it had flown out to his daddy, and for just a moment, before Tony had appeared (far away, as he always did, calling distantly) and the strange things had blotted out their kitchen and the carved roast on the blue plate, for just a moment his own consciousness had plunged through his daddy’s darkness to an incomprehensible word much more frightening than <span class="small">DIVORCE</span>, and that word was <span class="small">SUICIDE</span>. Danny had never come across it again in his daddy’s mind, and he had certainly not gone looking for it. He didn’t care if he never found out exactly what that word meant.</p>
  <p class="indent">But he did like to concentrate, because sometimes Tony would come. Not every time. Sometimes things just got woozy and swimmy for a minute and then cleared—most times, in fact—but at other times Tony would appear at the very limit of his vision, calling distantly and beckoning …</p>
  <p class="indent">It had happened twice since they moved to Boulder, and he remembered how surprised and pleased he had been to find Tony had followed him all the way from Vermont. So all his friends hadn’t been left behind after all.</p>
  <p class="indent">The first time he had been out in the backyard and nothing much had happened. Just Tony beckoning and then darkness and a few minutes later he had come back to real things with a few vague fragments of memory, like a jumbled dream. The second time, two weeks ago, had been more interesting. Tony, beckoning, calling <span id="page42"/>from four yards over: <i>“Danny … come see …”</i> It seemed that he was getting up, then falling into a deep hole, like Alice into Wonderland. Then he had been in the basement of the apartment house and Tony had been beside him, pointing into the shadows at the trunk his daddy carried all his important papers in, especially “<span class="small">THE PLAY.</span>”</p>
  <p class="indent">“See?” Tony had said in his distant, musical voice. “It’s under the stairs. Right under the stairs. The movers put it right … under … the stairs.”</p>
  <p class="indent">Danny had stepped forward to look more closely at this marvel and then he was falling again, this time out of the backyard swing, where he had been sitting all along. He had gotten the wind knocked out of himself, too.</p>
  <p class="indent">Three or four days later his daddy had been stomping around, telling Mommy furiously that he had been all over the goddam basement and the trunk wasn’t there and he was going to sue the goddam movers who had left it somewhere between Vermont and Colorado. How was he supposed to be able to finish “<span class="small">THE PLAY</span>” if things like this kept cropping up?</p>
  <p class="indent">Danny said, “No, Daddy. It’s under the stairs. The movers put it right under the stairs.”</p>
  <p class="indent">Daddy had given him a strange look and had gone down to see. The trunk had been there, just where Tony had shown him. Daddy had taken him aside, had sat him on his lap, and had asked Danny who let him down the cellar. Had it been Tom from upstairs? The cellar was dangerous, Daddy said. That was why the landlord kept it locked. If someone was leaving it unlocked, <span id="page43"/>Daddy wanted to know. He was glad to have his papers and his “<span class="small">PLAY</span>” but it wouldn’t be worth it to him, he said, if Danny fell down the stairs and broke his … his leg. Danny told his father earnestly that he hadn’t been down in the cellar. That door was always locked. And Mommy agreed. Danny never went down in the back hall, she said, because it was damp and dark and spidery. And he didn’t tell lies.</p>
  <p class="indent">“Then how did you know, doc?” Daddy asked.</p>
  <p class="indent">“Tony showed me.”</p>
  <p class="indent">His mother and father had exchanged a look over his head. This had happened before, from time to time. Because it was frightening, they swept it quickly from their minds. But he knew they worried about Tony, Mommy especially, and he was careful about thinking the way that could make Tony come where she might see. But now he thought she was lying down, not moving about in the kitchen yet, and so he concentrated hard to see if he could understand what Daddy was thinking about.</p>
  <p class="indent">His brow furrowed and his slightly grimy hands clenched into tight fists on his jeans. He did not close his eyes—that wasn’t necessary—but he squinched them down to slits and imagined Daddy’s voice, Jack’s voice, John Daniel Torrance’s voice, deep and steady, sometimes quirking up with amusement or deepening even more with anger or just staying steady because he was thinking. Thinking of. Thinking about. Thinking …</p>
  <p class="indent">(thinking)</p>
  <p class="indent">Danny sighed quietly and his body slumped on the <span id="page44"/>curb as if all the muscles had gone out of it. He was fully conscious; he saw the street and the girl and boy walking up the sidewalk on the other side, holding hands because they were</p>
  <p class="indent">(?in love?)</p>
  <p class="indent">so happy about the day and themselves together in the day. He saw autumn leaves blowing along the gutter, yellow cartwheels of irregular shape. He saw the house they were passing and noticed how the roof was covered with</p>
  <p class="indent"><i>(shingles. i guess it’ll be no problem if the flashing’s ok yeah that’ll be all right. that watson. christ what a character. wish there was a place for him in “<span class="small">THE PLAY</span>.” i’ll end up with the whole fucking human race in it if i don’t watch out. yeah. shingles. are there nails out there? oh shit forgot to ask him well they’re simple to get. sidewinder hardware store. wasps. they’re nesting this time of year. i might want to get one of those bug bombs in case they’re there when i rip up the old shingles. new shingles. old)</i></p>
  <p class="indent">shingles. So that’s what he was thinking about. He had gotten the job and was thinking about shingles. Danny didn’t know who Watson was, but everything else seemed clear enough. And he might get to see a wasps’ nest. Just as sure as his name was</p>
  <p class="indent"><i>“Danny … Dannee …”</i></p>
  <p class="indent">He looked up and there was Tony, far up the street, standing by a stop sign and waving. Danny, as always, felt a warm burst of pleasure at seeing his old friend, but this time he seemed to feel a prick of fear, too, as if Tony <span id="page45"/>had come with some darkness hidden behind his back. A jar of wasps which when released would sting deeply.</p>
  <p class="indent">But there was no question of not going.</p>
  <p class="indent">He slumped further down on the curb, his hands sliding laxly from his thighs and dangling below the fork of his crotch. His chin sank onto his chest. Then there was a dim, painless tug as part of him got up and ran after Tony into funneling darkness.</p>
  <p class="indent"><i>“Dannee—”</i></p>
  <p class="indent">Now the darkness was shot with swirling whiteness. A coughing, whooping sound and bending, tortured shadows that resolved themselves into fir trees at night, being pushed by a screaming gale. Snow swirled and danced. Snow everywhere.</p>
  <p class="indent">“Too deep,” Tony said from the darkness, and there was a sadness in his voice that terrified Danny. “Too deep to get out.”</p>
  <p class="indent">Another shape, looming, rearing. Huge and rectangular. A sloping roof. Whiteness that was blurred in the stormy darkness. Many windows. A long building with a shingled roof. Some of the shingles were greener, newer. His daddy put them on. With nails from the Sidewinder hardware store. Now the snow was covering the shingles. It was covering everything.</p>
  <p class="indent">A green witchlight glowed into being on the front of the building, flickered, and became a giant, grinning skull over two crossed bones.</p>
  <p class="indent">“Poison,” Tony said from the floating darkness. “Poison.”</p>
  <p class="indent">Other signs flickered past his eyes, some in green letters, <span id="page46"/>some of them on boards stuck at leaning angles into the snowdrifts. <span class="small">NO SWIMMING</span>. <span class="small">DANGER</span>! <span class="small">LIVE WIRES. THIS PROPERTY CONDEMNED. HIGH VOLTAGE. THIRD RAIL. DANGER OF DEATH. KEEP OFF. KEEP OUT. NO TRESPASSING. VIOLATERS WILL BE SHOT ON SIGHT</span>. He understood none of them completely—he couldn’t read!—but got a sense of all, and a dreamy terror floated into the dark hollows of his body like light brown spores that would die in sunlight.</p>
  <p class="indent">They faded. Now he was in a room filled with strange furniture, a room that was dark. Snow spattered against the windows like thrown sand. His mouth was dry, his eyes like hot marbles, his heart triphammering in his chest. Outside there was a hollow booming noise, like a dreadful door being thrown wide. Footfalls. Across the room was a mirror, and deep down in its silver bubble a single word appeared in green fire and that word was: REDRUM.</p>
  <p class="indent">The room faded. Another room. He knew</p>
  <p class="indent">(would know)</p>
  <p class="indent">this one. An overturned chair. A broken window with snow swirling in; already it had frosted the edge of the rug. The drapes had been pulled free and hung on their broken rod at an angle. A low cabinet lying on its face.</p>
  <p class="indent">More hollow booming noises, steady, rhythmic, horrible. Smashing glass. Approaching destruction. A hoarse voice, the voice of a madman, made the more terrible by its familiarity:</p>
  <p class="indent"><i>Come out! Come out, you little shit! Take your medicine!</i></p>
  <p class="indent"><span id="page47"/>Crash. Crash. Crash. Splintering wood. A bellow of rage and satisfaction. REDRUM. Coming.</p>
  <p class="indent">Drifting across the room. Pictures torn off the walls. A record player</p>
  <p class="indent">(?Mommy’s record player?)</p>
  <p class="indent">overturned on the floor. Her records, Grieg, Handel, the Beatles, Art Garfunkel, Bach, Liszt, thrown everywhere. Broken into jagged black pie wedges. A shaft of light coming from another room, the bathroom, harsh white light and a word flickering on and off in the medicine cabinet mirror like a red eye, REDRUM, REDRUM, REDRUM—</p>
  <p class="indent">“No,” he whispered. “No, Tony please—”</p>
  <p class="indent">And, dangling over the white porcelain lip of the bathtub, a hand. Limp. A slow trickle of blood (REDRUM) trickling down one of the fingers, the third, dripping onto the tile from the carefully shaped nail—</p>
  <p class="indent">No oh no oh no—</p>
  <p class="indent">(oh please, Tony, you’re scaring me)</p>
  <p class="indent">REDRUM REDRUM REDRUM</p>
  <p class="indent">(stop it, Tony, stop it)</p>
  <p class="indent">Fading.</p>
  <p class="indent">In the darkness the booming noises grew louder, louder still, echoing, everywhere, all around.</p>
  <p class="indent">And now he was crouched in a dark hallway, crouched on a blue rug with a riot of twisting black shapes woven into its pile, listening to the booming noises approach, and now a Shape turned the corner and began to come toward him, lurching, smelling of blood and doom. It <span id="page48"/>had a mallet in one hand and it was swinging it (REDRUM) from side to side in vicious arcs, slamming it into the walls, cutting the silk wallpaper and knocking out ghostly bursts of plaster dust:</p>
  <p class="indent"><i>Come on and take your medicine! Take it like a man!</i></p>
  <p class="indent">The Shape advancing on him, reeking of that sweetsour odor, gigantic, the mallet head cutting across the air with a wicked hissing whisper, then the great hollow boom as it crashed into the wall, sending the dust out in a puff you could smell, dry and itchy. Tiny red eyes glowed in the dark. The monster was upon him, it had discovered him, cowering here with a blank wall at his back. And the trapdoor in the ceiling was locked.</p>
  <p class="indent">Darkness. Drifting.</p>
  <p class="indent">“Tony, please take me back, please, please—”</p>
  <p class="indent">And he <i>was</i> back, sitting on the curb of Arapahoe Street, his shirt sticking damply to his back, his body bathed in sweat. In his ears he could still hear that huge, contrapuntal booming sound and smell his own urine as he voided himself in the extremity of his terror. He could see that limp hand dangling over the edge of the tub with blood running down one finger, the third, and that inexplicable word so much more horrible than any of the others: REDRUM.</p>
  <p class="indent">And now sunshine. Real things. Except for Tony, now six blocks up, only a speck, standing on the corner, his voice faint and high and sweet. “Be careful, doc …”</p>
  <p class="indent">Then, in the next instant, Tony was gone and Daddy’s battered red bug was turning the corner and chattering up the street, farting blue smoke behind it. Danny was <span id="page49"/>off the curb in a second, waving, jiving from one foot to the other, yelling: “Daddy! Hey, Dad! Hi! Hi!”</p>
  <p class="indent">His daddy swung the VW into the curb, killed the engine, and opened the door. Danny ran toward him and then froze, his eyes widening. His heart crawled up into the middle of his throat and froze solid. Beside his daddy, in the other front seat, was a short-handled mallet, its head clotted with blood and hair.</p>
  <p class="indent">Then it was just a bag of groceries.</p>
  <p class="indent">“Danny … you okay, doc?”</p>
  <p class="indent">“Yeah. I’m okay.” He went to his daddy and buried his face in Daddy’s sheepskin-lined denim jacket and hugged him tight tight tight. Jack hugged him back, slightly bewildered.</p>
  <p class="indent">“Hey, you don’t want to sit in the sun like that, doc. You’re drippin sweat.”</p>
  <p class="indent">“I guess I fell asleep a little. I love you, Daddy. I been waiting.”</p>
  <p class="indent">“I love you too, Dan. I brought home some stuff. Think you’re big enough to carry it upstairs?”</p>
  <p class="indent">“Sure am!”</p>
  <p class="indent">“Doc Torrance, the world’s strongest man,” Jack said, and ruffled his hair. “Whose hobby is falling asleep on street corners.”</p>
  <p class="indent">Then they were walking up to the door and Mommy had come down to the porch to meet them and he stood on the second step and watched them kiss. They were glad to see each other. Love came out of them the way love had come out of the boy and girl walking up the street and holding hands. Danny was glad.</p>
  <p class="indent"><span id="page50"/>The bag of groceries—<i>just</i> a bag of groceries—crackled in his arms. Everything was all right. Daddy was home. Mommy was loving him. There were no bad things. And not everything Tony showed him always happened.</p>
  <p class="indent">But fear had settled around his heart, deep and dreadful, around his heart and around that indecipherable word he had seen in his spirit’s mirror.</p>
`;

  const strippedString = htmlStr.replace(/(<([^>]+)>)/gi, "");

  return (
    <>
      <div>
        <style>{`/* ==================== RH Styles ===================== */
h1.otherbooks {
  text-align: center;
  font-size: medium;
  margin-bottom: 1em;
  margin-top: 4em;
}
div.otherbooks {
  margin-top: 4em;
  font-size: small;
  margin-left: 2em;
  margin-right: 2em;
}
div.copyright {
  font-size: small;
  margin-top: 4em;
}
div.dedication {
  font-size: small;
  margin-top: 8em;
}
div.epigraph {
  font-size: medium;
  margin-left: 8em;
  margin-right: 4em;
  margin-bottom: 2em;
  margin-top: 2em;
}
div.epigraphsource {
  font-size: x-small;
  text-align: right;
  font-style: italic;
  margin-bottom: 8em;
  margin-right: 2em;
}
h1.acknowledgments {
  font-size: medium;
  margin-top: 4em;
  text-align: center;
  font-weight: bold;
}
div.acknowledgments {
  font-size: small;
  text-align: justify;
  margin-left: 2em;
  margin-right: 2em;
}
h1.authorsnote {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
div.authorsnote {
  font-size: small;
  text-align: justify;
}
h1.listoffigures {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
div.listoffigures {
  font-size: small;
  text-align: left;
}
h1.chronology {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.geneology {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.foreword {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.preface {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.introduction {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.prologue {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.part {
  line-height: 1.3em;
  margin-top: 2em;
  margin-bottom: 1em;
  font-size: 2.5em;
  text-align: center;
  font-weight: bold;
}
h1.chapter {
  font-size: 1.3em;
  text-align: center;
  font-weight: bold;
  line-height: 1.3em;
  margin-top: 2em;
  margin-bottom: 3em;
}
h1.chapter0 {
  font-size: 1.3em;
  text-align: center;
  font-weight: bold;
  line-height: 1.3em;
  margin-top: 2em;
  margin-bottom: 3em;
}
h1.subchapter {
  font-size: 1.2em;
  text-align: center;
  font-weight: bold;
  margin-top: -2.5em;
  margin-bottom: 2em;
}
h1.epilogue {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.coda {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.conclusion {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.afterward {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.permission {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.glossary {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
span.glosaryterm {
  font-size: small;
  text-align: left;
  margin-right: 1em;
}
span.glosarydef {
  font-size: small;
  text-align: left;
  margin-right: 1em;
}
h1.appendix {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.resource {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.notes {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
div.note {
  font-size: x-small;
  text-align: justify;
  margin-left: 1em;
}
h1.source {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.bibliography {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
div.bibliography {
  font-size: x-small;
  text-align: justify;
  margin-left: 2em;
  font-weight: bold;
}
h1.suggestedreading {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h1.abouttheauthor {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
p.smallheight {
  margin-top: 1em;
  margin-bottom: 1em;
}
p.mediumheight {
  margin-top: 2em;
  margin-bottom: 2em;
}
p.attribution {
  text-align: right;
}
p.largeheight {
  margin-top: 3em;
  margin-bottom: 3em;
}
div.list {
  font-size: small;
  margin-left: 1em;
}
h1.box {
  font-size: medium;
  font-style: italic;
  text-align: center;
}
div.box {
  font-size: small;
  margin-left: 1em;
}
p.caption {
  font-size: x-small;
  font-style: italic;
  text-align: center;
  margin-bottom: 1em;
}
/* ===================== Added Styles ===================== */
p.nonindent {
  margin-bottom: 0;
  margin-top: 0;
  text-align: justify;
  text-indent: 0;
}
p.indent {
  margin-bottom: 0;
  margin-top: 0;
  text-align: justify;
  text-indent: 1em;
}
p.right {
  text-align: right;
}
p.center {
  margin-top: 1em;
  text-align: center;
  margin-bottom: 1em;
  margin-left: 1px;
}
a.hlink {
  text-decoration: none;
}
p.figure {
  font-size: small;
  margin-top: 2em;
  text-align: center;
  margin-bottom: 2em;
}
h1.subtitle {
  font-size: x-large;
  text-align: center;
  font-weight: bold;
  margin-bottom: 4em;
}
h1.contents {
  font-size: medium;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
h2.title {
  font-size: medium;
  text-align: center;
}
p.smallheight {
  margin-top: 1em;
}
p.mediumheight {
  margin-top: 2em;
}
p {
  margin-top: 0.3em;
  margin-bottom: 0.3em;
}
div.cover {
  text-align: center;
}
img {
  max-height: 100%;
  max-width: 100%;
}
img.inline {
  vertical-align: middle;
}
/* --- start affected by epubFix ---
Note: repeated instances of "text-align:center;" are normal */
/* --- start affected by epubFix ---
Note: repeated instances of "text-align:center;" are normal */
/* --- start affected by epubFix ---
Note: repeated instances of "text-align:center;" are normal */
div.titlepage {
  text-align: center;
  text-align: center;
  text-align: center;
}
/* --- end affected by epubFix --- */
/* --- end affected by epubFix --- */
/* --- end affected by epubFix --- */
a.pubhlink {
  color: #4c7aa9;
}
p.extract {
  text-indent: 0;
  text-align: justify;
  margin-top: 1em;
  margin-bottom: 0;
}
p.extract1 {
  text-align: justify;
  text-indent: 1em;
  margin-top: 1em;
  margin-bottom: 0;
}
div.textbox {
  margin-top: 2em;
  margin-bottom: 2em;
  border-bottom: 1px solid;
  border-top: 1px solid;
  line-height: 1.5em;
  text-align: center;
}
h1.caption {
  font-size: medium;
  margin-bottom: 1em;
}
p.box {
  border-bottom: 1px double;
  border-left: 1px double;
  border-top: 1px double;
  border-right: 1px double;
  text-align: justify;
}
div.abstract {
  font-size: small;
  text-align: justify;
  margin-left: 2em;
  margin-right: 2em;
}
div.appendix {
  margin-top: 1em;
  font-size: medium;
  text-align: justify;
}
p.reference {
  text-align: justify;
  text-indent: -1em;
  margin-left: 1em;
}
div.biboliography {
  font-size: medium;
  text-align: justify;
}
div.preface {
  margin-top: 4em;
  font-size: medium;
  text-align: justify;
}
div.preface1 {
  margin-top: 1em;
  font-size: medium;
  text-align: justify;
}
p.cop {
  margin-bottom: 1em;
}
span.small {
  font-size: x-small;
}
div.toc {
  font-size: medium;
  text-align: center;
}
p.stanga {
  text-align: justify;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 2em;
}
body {
  font-size: medium;
  line-height: 1.2em;
  margin-top: 1em;
  margin-left: 1em;
  margin-right: 1em;
  font-family: "Charis SIL", "Times New Roman", Verdana, Arial;
}
@font-face {
  font-family: "Charis SIL";
  font-style: normal;
  font-weight: normal;
  src: url(../fonts/CharisSILR.ttf);
}
@font-face {
  font-family: "Charis SIL";
  font-style: normal;
  font-weight: bold;
  src: url(../fonts/CharisSILB.ttf);
}
@font-face {
  font-family: "Charis SIL";
  font-style: italic;
  font-weight: normal;
  src: url(../fonts/CharisSILI.ttf);
}
@font-face {
  font-family: "Charis SIL";
  font-style: italic;
  font-weight: bold;
  src: url(../fonts/CharisSILBI.ttf);
}
h3.title {
  font-size: medium;
  text-align: center;
  margin-bottom: 3em;
}
span.dropcaps2line {
  font-size: 3em;
  line-height: 0.75em;
  float: left;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0.05em;
}
@media amzn-kf8 {
  span.dropcaps2line {
    font-size: 3em;
    margin-top: -0.1em;
    margin-bottom: -0.3em;
    margin-left: 0;
    margin-right: 0.05em;
  }
}
@media amzn-mobi {
  span.dropcaps2line {
    margin: auto;
  }
}
span.dropcaps3line {
  font-size: 4.6em;
  float: left;
  line-height: 0.75em;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0.05em;
}
@media amzn-kf8 {
  span.dropcaps3line {
    font-size: 4.5em;
    margin-top: -0.1em;
    margin-bottom: -0.4em;
    margin-left: 0;
    margin-right: 0.05em;
  }
}
@media amzn-mobi {
  span.dropcaps3line {
    margin: auto;
  }
}
span.dropcaps4line {
  float: left;
  font-size: 120px;
  line-height: 90px;
  padding-top: 1px;
  margin-top: -0.09em;
  margin-right: 0.02em;
}
@media amzn-kf8 {
  span.dropcaps4line {
    font-size: 110px;
    margin-top: -0.3em;
    margin-bottom: -0.4em;
    margin-left: 0;
    margin-right: 0.05em;
  }
}
@media amzn-mobi {
  span.dropcaps4line {
    margin: auto;
  }
}
sup.small {
  font-size: small;
  line-height: 0;
}
div.footnote {
  font-size: small;
  border-style: solid;
  border-width: 1px 0 0 0;
  margin-top: 2em;
}
p.footnote {
  text-align: justify;
}
p.question {
  text-align: justify;
  margin-top: 1em;
}
div.small-page {
  margin-top: 2em;
  font-size: medium;
  margin-left: 12em;
  margin-right: 6em;
}
h1.toc {
  font-size: medium;
  margin-bottom: 1em;
}
ol.upperalpha {
  text-align: justify;
  list-style-type: upper-alpha;
}
ol.upperroman {
  text-align: justify;
  list-style-type: upper-roman;
}
ol.lowerroman {
  text-align: justify;
  list-style-type: lower-roman;
}
ol.loweralpha {
  text-align: justify;
  list-style-type: lower-alpha;
}
ol.arabic {
  text-align: justify;
}
h1.section {
  text-align: left;
  font-size: medium;
  margin-bottom: 1em;
  margin-top: 4em;
}
h2.section {
  text-align: center;
  font-size: medium;
  margin-bottom: 1em;
  margin-top: 2em;
}
h3.section {
  text-align: left;
  font-size: medium;
  margin-bottom: 1em;
  margin-top: 2em;
}
h4.section {
  text-align: left;
  font-size: medium;
  margin-bottom: 1em;
  margin-top: 2em;
}
h5.section {
  text-align: left;
  font-size: medium;
  margin-bottom: 1em;
  margin-top: 2em;
}
span.underline {
  text-decoration: underline;
}
span.big {
  font-size: xx-large;
}
p.crt {
  text-indent: 0;
  margin-top: 1em;
  text-align: center;
  margin-bottom: 1em;
}
span.overline {
  text-decoration: overline;
}
h1.chapter1 {
  font-size: 1.3em;
  text-align: left;
  font-weight: bold;
  line-height: 2em;
  margin-top: 4em;
  margin-bottom: 1em;
}
p.textbox {
  text-indent: 0;
  text-align: justify;
  margin-left: 1em;
  margin-right: 1em;
}
p.textbox1 {
  text-indent: 1em;
  text-align: justify;
  margin-left: 1em;
  margin-right: 1em;
}
div.chapter {
  margin-top: 2em;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
span.strike {
  text-decoration: line-through;
}
sup {
  vertical-align: 4px;
}
sub.frac {
  font-size: 0.7em;
}
sup.frac {
  font-size: 0.7em;
}
p.pagebreak {
  page-break-after: always;
}
div.part {
  margin-top: 2em;
  margin-left: 1em;
  margin-right: 1em;
}
img.middle {
  vertical-align: middle;
}
div.textbox1 {
  margin-left: 2em;
  margin-right: 2em;
  margin-top: 2em;
  margin-bottom: 2em;
  border-bottom: 2px solid;
  border-left: 2px solid;
  border-right: 2px solid;
  border-top: 2px solid;
  line-height: 1.3em;
  text-align: center;
}
/* =============== New Style added =============== */
/* == For TOC == */
div.toc_fm {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  font-size: 0.9em;
  line-height: 1.3em;
  text-align: left;
}
div.toc_chap {
  margin-left: 0;
  font-size: 1em;
  line-height: 1.4em;
}
div.toc_sub {
  margin-left: 1.3em;
  font-size: smaller;
  line-height: 1.4em;
}
div.toc_part {
  margin-left: 0;
  margin-top: 1.2em;
  line-height: 1.5em;
  font-size: 1.2em;
}
div.toc_part .toc_chap {
  font-size: medium;
  margin-left: 1.5em;
}
div.toc_part .toc_chap .toc_sub {
  font-size: smaller;
  margin-left: 1.5em;
}
/* == For Block Quotes == */
div.block {
  margin-left: 0;
  margin-right: 0;
  text-align: justify;
  margin-top: 1em;
  margin-bottom: 1em;
}
p.bl_nonindent {
  text-indent: 0;
  font-size: small;
  margin-left: 1.5em;
  margin-right: 1.5em;
  text-align: justify;
}
p.bl_indent {
  font-size: small;
  text-indent: 1em;
  margin-left: 1.5em;
  margin-right: 1.5em;
  text-align: justify;
}
/* For Hanging Paragraphs */
p.hanging {
  text-indent: -1em;
  font-size: small;
  text-align: justify;
}
div.hanging {
  margin-left: 1em;
}
/* For Dialogue Text */
div.dialogue {
  margin-left: 4.2em;
  margin-bottom: 2em;
  margin-top: 1.5em;
  font-size: small;
}
p.d_hanging {
  text-indent: -4.2em;
  font-size: small;
  margin-top: 0.5em;
}
/* For bullet list */
ul.bullet {
  list-style-type: disc;
  margin-top: 1em;
  margin-bottom: 1em;
}
div.bullet {
  margin-left: 0.8em;
  margin-top: 0;
  margin-bottom: 0;
  text-align: justify;
}
/* For Fractions */
.frac_num {
  font-size: x-small;
  vertical-align: text-top;
}
.frac_den {
  font-size: x-small;
  vertical-align: text-bottom;
}
p.bl_extract {
  text-indent: 0;
  font-size: small;
  margin-left: 1.5em;
  margin-right: 1.5em;
  text-align: justify;
  margin-top: 1em;
}
p.bl_right {
  font-size: small;
  text-align: right;
  margin-right: 1.5em;
}
div.toc_bm {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  font-size: 0.9em;
  line-height: 1.3em;
  text-align: left;
}
span.small1 {
  font-size: medium;
}
p.bl_center {
  font-size: small;
  margin-top: 1em;
  margin-left: 5em;
  margin-right: 5em;
  text-align: center;
  line-height: 1.3em;
}
p.bl_nonindent1 {
  text-indent: 0;
  font-size: small;
  margin-left: 2.5em;
  margin-right: 2.5em;
  text-align: justify;
}
p.bl_indent1 {
  font-size: small;
  text-indent: 1em;
  margin-left: 2.5em;
  margin-right: 2.5em;
  text-align: justify;
}
p.bl_center1 {
  font-size: small;
  margin-left: 2.5em;
  margin-right: 2.5em;
  text-align: center;
}
p.bl_extract1 {
  text-indent: 0;
  font-size: small;
  margin-left: 2.5em;
  margin-right: 2.5em;
  text-align: justify;
  margin-top: 1em;
}
p.bl_right1 {
  font-size: small;
  text-align: right;
  margin-right: 2.5em;
}
div.bl_hanging {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 3em;
  margin-right: 1.5em;
}
p.bl_hanging {
  font-size: small;
  text-indent: -1em;
  text-align: justify;
}
p.footnote1 {
  font-size: small;
  text-indent: -1em;
  margin-left: 1.2em;
  text-align: justify;
}
p.footnote2 {
  font-size: small;
  text-indent: -1.8em;
  margin-left: 1.5em;
  text-align: justify;
}
p.footnote3 {
  font-size: small;
  text-indent: -2em;
  margin-left: 1.3em;
  text-align: justify;
}
span.small2 {
  font-size: 0.9em;
}
h1.chapter2 {
  font-size: 1.3em;
  text-align: center;
  font-weight: bold;
  line-height: 1.3em;
  margin-top: 0;
  margin-bottom: 3em;
}
div.appendix1 {
  margin-top: 4em;
  font-size: small;
  text-align: justify;
}
p.primary {
  text-indent: -1em;
  margin-left: 1em;
}
p.secondary {
  text-indent: -1em;
  margin-left: 2em;
}
p.center1 {
  margin-top: -0.5em;
  text-align: center;
  margin-bottom: 1em;
  margin-left: 1px;
}
span.color1 {
  color: #818284;
}
span.color2 {
  color: #646466;
}
span.color3 {
  color: #a8a9ad;
}
span.color4 {
  color: #58585a;
}
div.hanging0 {
  margin-left: 2em;
}
p.hanging0 {
  text-indent: -2.2em;
  font-size: small;
  text-align: justify;
}
div.dis_img {
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;
}
span.normal {
  font-weight: normal;
  font-size: 0.8em;
}
span.normal0 {
  font-weight: normal;
  font-size: 0.9em;
}
h1.chapter4 {
  font-size: 1.3em;
  text-align: center;
  font-weight: bold;
  line-height: 1.3em;
  margin-top: 2em;
  margin-bottom: 1em;
}
h2.section0 {
  text-align: center;
  font-size: 0.9em;
  margin-bottom: 0;
  margin-top: 2em;
  font-weight: bold;
}
p.center8 {
  margin-top: 0;
  text-align: center;
  margin-bottom: 0;
  margin-left: 1px;
}
p.nonindent8 {
  margin-bottom: 0;
  margin-top: 0;
  margin-left: 2em;
  margin-right: 2em;
  text-align: justify;
  text-indent: 0;
}
p.nonindent9 {
  margin-bottom: 0;
  margin-top: 0;
  margin-left: 6em;
  margin-right: 4em;
  text-align: justify;
  text-indent: 0;
}
div.block8 {
  margin-left: 10%;
  margin-right: 4em;
  text-align: justify;
  margin-top: 1em;
  margin-bottom: 1em;
}
h1.subchapter4 {
  font-size: 2em;
  text-align: center;
  font-weight: normal;
  color: #818284;
  margin-top: 2em;
  line-height: 1.1em;
}
h1.chapter7 {
  font-size: 1.3em;
  text-align: center;
  font-weight: normal;
  line-height: 1.3em;
  margin-top: 2em;
  margin-bottom: 3em;
}
div.bl_hanging0 {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 2em;
  margin-right: 1.5em;
}
div.block9 {
  margin-left: 0;
  margin-right: 0;
  text-align: justify;
  margin-top: 0;
  margin-bottom: 0;
}
div.block7 {
  margin-left: 4em;
  margin-right: 4em;
  text-align: justify;
  margin-top: 1em;
  margin-bottom: 1em;
}
div.bl_hanging8 {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 6em;
  margin-right: 1.5em;
}
p.center9 {
  margin-top: 0.3em;
  text-align: center;
  margin-bottom: 0.3em;
  margin-left: 1px;
}
span.small3 {
  font-size: small;
}
span.big4 {
  font-size: 1em;
}
p.center4 {
  margin-top: 1em;
  text-align: center;
  margin-bottom: 1em;
  margin-left: 1px;
  border-bottom: 1px solid;
}
p.center7 {
  margin-top: 0;
  text-align: center;
  margin-bottom: 1em;
  margin-left: 1px;
}
p.center00 {
  margin-top: 0;
  text-align: center;
  margin-bottom: 0;
}
p.bl_hanging00 {
  font-size: small;
  text-indent: -2em;
  text-align: justify;
}
p.bl_hanging01 {
  font-size: small;
  text-indent: -6em;
  text-align: justify;
}
p.bl_hanging02 {
  font-size: small;
  text-indent: -4em;
  text-align: justify;
}
div.bl_hanging1 {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 4em;
  margin-right: 1.5em;
}
div.boba {
  text-align: center;
  margin: 10% 10% 0 10%;
  page-break-inside: avoid;
}
p.boba_url {
  text-align: center;
  font-size: 0.9em;
  margin-top: 1em;
}
`}</style>
        {/* <div
          dangerouslySetInnerHTML={{
            __html: htmlStr,
          }}
        /> */}
        <Text>{strippedString}</Text>
      </div>
    </>
  );
};

export default Fish;
