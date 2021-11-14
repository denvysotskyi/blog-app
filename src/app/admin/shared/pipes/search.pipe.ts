import { Pipe, PipeTransform } from '@angular/core'

import { IPost } from '../../../shared/interfaces'

@Pipe({
  name: 'searchPost'
})
export class SearchPipe implements PipeTransform{

  transform(postArr: IPost[], search = ''): IPost[] {
    if (!search.trim()) {
      return postArr
    }
    return postArr.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}

