import { Injectable } from '@angular/core';
import { OpenAI} from 'openai';
import { Observable, Subject, filter, from, map } from 'rxjs';
import { Conversation } from './conversation.model';
import { openiaEnvironment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  newChat$ = new Subject<boolean>();

  hour = new Date().getHours()
  minutes = new Date().getMinutes()
  currentTime: string = "";

  currentConversation: Conversation[] = [];

  openai = new OpenAI({
    apiKey: openiaEnvironment.apiKey,
    dangerouslyAllowBrowser: true
  });

  getDataFromOpenAi(text: string) {
      from(this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": text}],
        max_tokens: 50,
      })).pipe(
        filter(resp => !!resp && !!resp.choices),
        map(resp => resp.choices[0].message)
      ).subscribe(data => {
        if(data.content) {
          const answer: Conversation = {
            text: data.content,
            time: new Date().getHours() + ':' + new Date().getMinutes(),
            role: 'openia'
          }
          this.currentConversation.push(answer);
          this.newChat$.next(true);
        }
      });
  }
}
