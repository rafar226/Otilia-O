import { Injectable } from '@angular/core';
import { OpenAI} from 'openai';
import { Subject, from } from 'rxjs';
import { Conversation } from './conversation.model';
import { openiaEnvironment } from '../../environments/environments';
import { EmbeddingData } from './embedding-data.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  newChat$ = new Subject<boolean>();
  url = 'https://otilia.netlify.app/.netlify/functions/index/create';

  hour = new Date().getHours()
  minutes = new Date().getMinutes()
  currentTime: string = "";

  currentConversation: Conversation[] = [];

  openai = new OpenAI({
    apiKey: openiaEnvironment.apiKey,
    dangerouslyAllowBrowser: true
  });

  getEmbeddings() {
    const allData: EmbeddingData[] = [];
    const textArray: any = [];

    textArray.forEach((text: any) => {
      from(this.openai.embeddings.create({
        input: text,
        model: "text-embedding-ada-002",
        encoding_format: "float"
      })).subscribe(data => {
        const embeddingsData: OpenAI.Embeddings.Embedding[] = data.data;
        const newData = {
          plot_embedding: embeddingsData[0].embedding,
          text: text
        }

        allData.push(newData);
      })
    })

    // setTimeout(() => {
    //   console.log(allData)

    // }, 3000)

  }
}
