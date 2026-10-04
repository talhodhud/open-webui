from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field
import asyncio


class Tools:
    class Valves(BaseModel):
        SEARCH_DB_PATH: str = Field(default=DEFAULT_DATABASE, description="Absolute path to the separate phrase-search SQLite index.")

    def __init__(self):
        self.valves = self.Valves()

    async def search_remembered_hadith(self, query: str, collection: str = "all", limit: int = 6) -> tuple:
        """
        Search remembered ARABIC words across six Hadith collections and display an interactive evidence card.
        Call this for a phrase-search request. Return the card; never infer authenticity from a match.
        Ask the user to select a result; use its complete record_id with open_hadith_record.
        :param query: Only the remembered Arabic words, not the surrounding question. Maximum 200 characters and 12 words.
        :param collection: all, bukhari, muslim, abudawud, tirmidhi, nasai, or ibnmajah.
        :param limit: Number of candidates, 1 to 12.
        :return: Interactive HTML and structured result context with exact record identifiers.
        """
        try:
            result = await asyncio.to_thread(PhraseSearch(self.valves.SEARCH_DB_PATH).search, query, collection, limit)
            context = {k: result[k] for k in ['status','query','collection','total_matches','suggestions','notice','manifest']}
            context['results'] = [{k:r[k] for k in ['record_id','collection_label','chapter_title','source_position','match_type','source_url','review_status']} for r in result['results']]
            context['next_step'] = 'The user can inspect cards locally. On selection, call open_hadith_record with the exact record_id. Do not output grades or invent a canonical Hadith number.'
            return HTMLResponse(render_interface(UI_TEMPLATE,result),headers={'Content-Disposition':'inline'}), context
        except (ValueError,FileNotFoundError,sqlite3.Error) as exc:
            return self._error(str(exc))

    async def open_hadith_record(self, record_id: str) -> tuple:
        """
        Retrieve the exact occurrence chosen from the interactive phrase-search card, preserving its source.
        :param record_id: Complete opaque record_id returned by search_remembered_hadith; never substitute a Hadith number.
        :return: Full source text, citation, unreviewed status, and interactive evidence card.
        """
        try:
            result=await asyncio.to_thread(PhraseSearch(self.valves.SEARCH_DB_PATH).get,record_id)
            if result['status']!='ok':
                return self._error(result['message'])
            record=result['record']
            payload={'status':'ok','query':'','results':[],'shown':0,'total_matches':0,'collections':COLLECTIONS,'manifest':result['manifest']}
            context={'status':'ok','record_id':record_id,'arabic':record['arabic'],'citation':record['citation'],'review_status':record['review_status'],'grade':None,
                     'instruction':'Acknowledge the exact selected text and its source. This is a dataset transcription, not independent authentication. Do not add a grade, inferred chain, or canonical number.'}
            return HTMLResponse(render_interface(UI_TEMPLATE,payload,selected=record),headers={'Content-Disposition':'inline'}),context
        except (ValueError,FileNotFoundError,sqlite3.Error) as exc:
            return self._error(str(exc))

    def _error(self,message):
        import html
        return HTMLResponse('<html lang="ar" dir="rtl"><body><p>'+html.escape(message)+'</p></body></html>',headers={'Content-Disposition':'inline'}),{'status':'error','message':message}
