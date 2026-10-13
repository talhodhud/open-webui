import test from 'node:test';
import assert from 'node:assert/strict';
import {lessonsFromNativeChat, cardDocument, cardPlainText, safeSourceURL} from './src/nativeLesson.ts';
import {TOPIC_JOURNEYS, topicQuestion, buildJourneyURL} from './src/journeys.ts';
import {TOPIC_EVIDENCE} from './src/topicEvidence.ts';
const lesson={topic_id:'topic-worship',title_ar:'العبادة',format:'card',source_verified:true,scholarly_approved:false,review_status:'needs_review',presentation:{type:'hadith_card',schema_version:'1',headline:'بطاقة <script>bad</script>',takeaway:'معنى مبسط',quotes:[{exact_text:'نص موثق',source_label:'صحيح البخاري · كتاب الصلاة',occurrence_id:'itqan:record',source_url:'https://example.com/source',text_sha256:'abc',source_span:[0,8],source_locator:{display_label:'الموضع المحلي 7'}}]}};
function response(data=lesson){return {chat:{history:{currentId:'a',messages:{a:{id:'a',role:'assistant',parentId:null,output:[{type:'function_call',name:'hadith_bayan_topics.get_reviewed_lesson',call_id:'call'},{type:'function_call_output',call_id:'call',output:[{type:'input_text',text:JSON.stringify({schema_version:'1',status:'needs_review',data})}]}]}}}}};}
test('card comes from matching native tool output and visible assistant branch',()=>{
 assert.equal(lessonsFromNativeChat(response(),['a']).length,1);
 assert.equal(lessonsFromNativeChat(response(),['other']).length,0);
 const r=response();r.chat.history.messages.a.output[0].name='get_topic_evidence';assert.deepEqual(lessonsFromNativeChat(r),[]);
});
test('incomplete, failed, or falsely approved content cannot create cards',()=>{
 for(const patch of [{source_verified:false},{scholarly_approved:true},{format:'qa'},{presentation:null}])assert.equal(lessonsFromNativeChat(response({...lesson,...patch})).length,0);
 const r=response();r.chat.history.messages.a.output[1].call_id='unrelated';assert.equal(lessonsFromNativeChat(r).length,0);
});
test('export escapes text, keeps identifiers in source details, and blocks active links',()=>{
 const html=cardDocument(lesson);assert.ok(!html.includes('<script>'));assert.ok(html.includes('&lt;script&gt;'));
 assert.ok(!html.split('<details>')[0].includes('itqan:'));assert.ok(html.includes('itqan:record'));
 assert.ok(!cardPlainText(lesson).includes('itqan:'));assert.ok(cardPlainText(lesson,true).includes('itqan:'));
 for(const url of ['javascript:alert(1)','http://example.com','https://user:secret@example.com','file:///C:/secret'])assert.equal(safeSourceURL(url),null);
});
test('subtopic journey retains selected scope, audience, format and unified model',()=>{
 const j=TOPIC_JOURNEYS.find(j=>j.id==='topic-worship');
 const url=new URL(buildJourneyURL('http://localhost:8080',j.id,false,undefined,{mode:'unified',audience:'educator',format:'card',subtopicId:'worship_prayer'}));
 assert.equal(url.searchParams.get('model'),'bayan-unified-pilot');assert.equal(url.searchParams.get('subtopic'),'worship_prayer');
 const subtopic=j.topic.subtopics.find(s=>s.id==='worship_prayer');
 assert.ok(url.searchParams.get('q').includes(subtopic.title));assert.ok(url.searchParams.get('q').includes(j.title));
 assert.ok(url.searchParams.get('q').includes('معرّف بالإسلام'));assert.equal(url.searchParams.get('q').includes('subtopic_id'),false);
 assert.throws(()=>topicQuestion(j,'newcomer','card','foreign-subtopic'));
});
test('older lessons render only when their recorded quote exactly matches the frozen source',()=>{
 const r=TOPIC_EVIDENCE['topic-faith'][0], text='إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى', start=Array.from(r.text).join('').indexOf(text);
 const data={...lesson,topic_id:'topic-faith',presentation:undefined,lesson_content:{headline:'النية',takeaway:'معنى محفوظ'},quotes:[{occurrence_id:r.id,exact_text:text,source_span:[start,start+text.length]}]};
 assert.equal(lessonsFromNativeChat(response(data)).length,1);
 assert.equal(lessonsFromNativeChat(response({...data,quotes:[{...data.quotes[0],exact_text:'مخترع'}]})).length,0);
 assert.equal(lessonsFromNativeChat(response({...data,topic_id:'topic-worship'})).length,0);
});
test('a newer unavailable scoped lesson cannot fall back to an older general card',()=>{
 const r=response(),o=r.chat.history.messages.a.output;
 o.push({type:'function_call',name:'get_reviewed_lesson',call_id:'scoped'},
  {type:'function_call_output',call_id:'scoped',output:JSON.stringify({schema_version:'1',status:'unavailable',data:{topic_id:'topic-worship',subtopic_id:'worship_solidarity'}})});
 assert.equal(lessonsFromNativeChat(r).length,0);
});
