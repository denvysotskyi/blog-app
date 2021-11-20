import { Pipe, PipeTransform } from '@angular/core'

import { PostInterface } from '../../../shared/interfaces/app.interfaces'

@Pipe({
  name: 'searchPost'
})
export class SearchPipe implements PipeTransform {
  transform(postArr: PostInterface[], search = ''): PostInterface[] {
    if (!search.trim()) {
      return postArr
    }
    return postArr.filter((post) => {
      return post.title.toLowerCase().includes(search.toLowerCase())
    })
  }
}
