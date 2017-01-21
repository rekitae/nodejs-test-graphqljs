
# GraphQL

alias gql="curl -XPOST -H Content-Type:application/graphql http://localhost:3000/graphql -d"

# query

gql "query RootQueryType { getCount: count }"
gql "query { getCount: count }"
gql "query { count }"
gql "query { count, count }" # 둘중 하나만 실행됨.
gql "query { getCount1: count, getCount2: count }" # count 가 순서대로 두번 실행됨.

gql "query RootQueryType { getUsers: users { name, age, address } }"
gql "query { getUsers: users { name, age, address } }"
gql "query { users { name, age, address } }"

gql "query { user(_id:\"ktlee\") { name, age, address }}"
gql "query { user(_id:\"ktlee1\") { name, age, address }}" # resolver 에 못찾으면 ktlee 를 리턴하도록 되어 있음.
gql "query { user(_id:\"choon\") { name, age, address }}"

gql "query { user(_id:\"ktlee\") { name, age, address }, user(_id:\"choon\") { name, age, address }}" # 실행 못함. alias 다르게 아래와 같이 지정 해야함.
gql "query { ktlee: user(_id:\"ktlee\") { name, age, address }, choon: user(_id:\"choon\") { name, age, address }}" # 실행 못함. alias 다르게 아래와 같이 지정 해야함.

gql "mutation RootMutationType { modifyCount: setCount(count:10000) }"
gql "mutation RootMutationType { setCount(count:10000) }"
gql "mutation { setCount(count:10000) }"
gql "query { getCount1: count, getCount2: count }"

gql "mutation { createUser(name:\"haha\") { name, age, address }}" # age 누락
gql "mutation { createUser(name:\"haha\", age:10 ) { name, age, address }}"
gql "mutation { haha: createUser(name:\"haha\", age:10 ) { name, age, address }, hehe: createUser(name:\"hehe\", age:11, address:\"Tokyo\" ) { name, age, address }}"

gql "query { __schema { types { name }}}"
gql "query { __schema { queryType { name }} __type(name:"User") { }}"


