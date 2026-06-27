# System Design

## Strategies decisions

- Architecture decisions
- Performance optimization
- Data storage Design
- Custom impacting choices

## step 1: Building a single server

> single server handle all web app ,Database, cache

### Flow of understanding the single server

- web browser: the server handle business logic data storage
  and presentation using HTML, CSS, and Javascript.

- mobile app: request data from the server using API calls.Response are
  typically in JSON format.

### key takeaways

- start small: begin with a straightforward single server setup.
- request flow: understand and how request flow through your system.
- traffic sources: web and mobile apps and how they interact with your server.

## Databases

### Two main options

| Relations databases management system (RDBMS) | non-relational databases (NoSql databases) |
| --------------------------------------------- | ------------------------------------------ |
| mysql                                         | redis                                      |
| postgresql                                    | mongodb                                    |
| Sqllite                                       | neo4j                                      |

### Relational databases

> SQL - structured query language
> It a row based database and support complex join operations.

### NoSql Databases

> It store data like a json format for complex records.

### when to use

| Relational                                       | non-relational                             |
| ------------------------------------------------ | ------------------------------------------ |
| Data is well-structure with clear relationships. | super-low latency for rapid reponses.      |
| strong consistency and transactional integrity.  | Data is unstructured and semi-structure.   |
|                                                  | scalable storage for massive data volumes. |

## vertical vs Horizontal scaling

### vertical scaling (scale up)

- it use single server and good for small traffic project
- server fails in large traffic user handling.

### Horizontal scaling (scale out)

- we create multiple server to handling high user traffic interaction with our application.
- with help of load balancer in middle that find less load server for stability.

## Load balancer

- load balancer distribute incoming network traffic across multiple server to ensure no single
  server bears too much load.

> seven algorithms for load balancer

- `Round robin`: distribute each request to different server with cycle way.
- `least connections`: send request to server with least active connections.
- `least response time`: send response from server to client quite fast and handle server request effective.
- `ip hash`: if want to client to connect with server along same ip address. client request sent to load balancer and it send to appropriate server.
- `weight algorithms`: send request to load balancer to server with high ram space
- `geographical algorithms`: it send request directly close to user geographical location.
- `consistent hash`: it use hash function to distribute various node to server and cycle connect with
  all server depends on user hash node request send to user based on hash address.

## Health checks

- This help to know server are in running/fails.

## single point of failure (SPOF)

- Any component that could cause the whole system to fail if it stops working.
- For example: db fails data can't get user data from databases or api fails.

## API Design

- what APIs are and their role in system architecture.
- The 3 most common API styles
- 4 key design principle that make great APIs.
- How application protocols influence API design decisions.
- The API design process.

> what is API?
> Application programming interface defines how software components should interact.

### core API styles

### REST (web 7 mobile apps)

- `resources-based`: organized around resources using http methods.
- `stateless`: each request contains all information needed.
- `standardized methods`: GET, POST, PATCH, DELETE,etc,.
- most common API style.

example:

```json
GET /api/v1/users/123
GET /api/v1/users/posts
```

### GraphQL (complex UIs)

- `Query language`: client request exactly what they need.
- `single endpoint`: one endpoint for all operations.
- `operations`: query(read), mutation(write), subscription(real-time).
- minimal round trips.

example:

```json
query{
  user(id: "123"){
  name
  posts {title, content},
}
}
```

### gRPC (microservices)

- `protocols buffers`: binary serilization with schema definition
- `service definition`: methods defined RPCs in .proto files.
- `communication types`: unary, server streaming, client streaming, bidirectional streaming.
- high performance.

## key design principles

> The best API is one developers can use without reading documentation.

- consistency for naming, patterns.
- simplicity for focus on core use cases.
- security for authentication, authorization, input validation, rate limiting.
- performance in caching strategies, pagination, minimize payloads, reduce rounds trips.

## API protocols

> your protocols choice fundamentally shapes your API design options

### How protocols influence API design

- HTTP --influence---> RESTful APIs
- Status codes for CRUD operations
- webSockets for GraphQL
- gRPC for Real-time APIs.

### The API design process

- identify core use cases and user stories.
- define scope and boundaries.
- determine performance requirements.
- consider security constraints.

### Design process

- top-down: start with high-level requirement and workflows.
- bottom-up: begin with existing data models and capabilities.
- contract-first: define the API contract before implementations.

### API lifecycle management

design -> development -> deployment & monitoring maintenance -> deprecation & retirement.

## API protocols

- The role of application protocols in the network stack.
- HTTP/HTTPS fundamentals and their relationships to APIs.
- webSockets for real-time communication.
- AMQP (advanced message queuing protocol).
- gRPC (google remote procedure call).

> These protocols are in application layer (API focus).

## Transport layer: TCP & UDP.

- TCP: Reliable but slower.
- UDP: fast but unreliable.
- TCP vs UDP.

### Transmission control protocol (TCP)

- guaranteed delivery.
- connection-based (3-way handshake)
- ordered packets.
- Error checking.

### user datagram protocol (UDP)

- no delivery guarantee.
- connectionless (No handshake).
- faster transmission.
- less overhead.

## RESTful APIs

- REST architecture principles and constraints.
- Resources modeling and URL design.
- status codes and error handling.
- best practice for restful APIs.

### resources modeling

| business | REST resources | url patterns                       |
| -------- | -------------- | ---------------------------------- |
| product  | products       | /api/v1/products/products/4f545h.. |
| orders   | orders         | /api/v1/orders/orders/4f5f4h..     |
| reviews  | reviews        | /products/4f54h..                  |

### Benefits of filtering, sorting, pagination

- save bandwidth.
- improves performance.
- gives frontend more flexibility.

## RESTful APIs best practice

- use plurals nouns for resources.
- keep urls consistent and hierarchical.
- support filtering, sorting, pagination.
- version your APIs.

## GraphQL

- core concepts of GraphQL and why it exists.
- schema design and type system.
- queries and mutations.
- handling errors.
- best practice for designing GraphQL APIs.

### why it exists

> GraphQL was created by facebook to solve a specific pain to get exact data even in
> mutliple request.

## Authentication

- what is authentication?
- who is this user.

- basic auth: authenticated with bearer token.

## Authorization

> Authorization = what are they allowed to do?

- login request -> authentication -> authorization checks -> allowed/denied actions.
- control security, privacy, and system integrity.

### How application manage permission

- RBAC (role based access control)
- ABAC (attribute-based access control)
- ACL (access control list)

* How OAuth2 and JWTs help enforce those rules.

## security

### 7 technique to protect your APIs

1.rate limiting:

- limit per endponits/ip and overall to mitigate DDoS.

  2.cors (cross-origin resources)

- allowed only our production domain url.

  3.sql & NoSql injection

```sql
SELECT * FROM users
WHERE username = 'admin' --`
AND password = '123';
```

- prevent always use orm safe guard.

  4.firewalls
  - protect suspicious attack and block unknow APIs.

    5.VPNs (virtual private networks)

  - only access within same networks ip address or alloed ones in networks.

    6.CSRF (cross-site Request forgery)

  - it find sesssion coookie to auth user to avoid from unknown users.

    7.XSS (cross-site scripting)

  - prevent from hacking injecting scripts to application too get data of our's.
