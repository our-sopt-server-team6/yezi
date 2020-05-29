# user table
| userIdx | name | id | password | 
| ------- | ---- | -- | -------- |
| 0 | yeji | yezgoget | secret | 
| 1 | gyeongseon | gngsn  | ppppppppppark |
| 2 | yoonho | apple_fairly | qwerty |

# article table
| articleIdx | author | title | content | likes | comment |
| --------- | ------ | ----- | -------- | ----- | ------ | 
| 0 | 예지 | 서버고수가 될 수 있을까? |  열심히 배울게요 | 100 | 화이팅 | 
| 1 | 경선 | 서버고수가 되는법 | all about nodejs | 9999 | bestseller | 

# comment table
| idx | userIdx | articleIdx | comment | 
| --- | ------- | --------- | -------- | 
| 0 | 0 | 1 | 경선이랑 아아마시고 싶다 | 
| 1 | 0 | 1 | 윤호가 깎아준 사과 먹고싶다 | 
| 2 | 1 | 0 | 주히는 뭐하고 사나 | 