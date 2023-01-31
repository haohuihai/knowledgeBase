![image-20230129221928214](images/image-20230129221928214.png) 

![image-20230129221941874](images/image-20230129221941874.png) 

![image-20230129221958519](images/image-20230129221958519.png) 

get提交

```yaml

/**
 * @swagger
 * 
 * definition:
 *   Puppy:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 * */

/**
 * @swagger
 * /test:
 *    get:
 *      tags:
 *      - 测试
 *      summary: 提交考试答案
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: name
 *        in: query
 *        description: 姓名
 *        required: true
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      - name: phone
 *        in: query
 *        description: 电话
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
```

post提交

```yaml


/**
 * @swagger
 * /test2:
 *    post:
 *      tags:
 *      - 测试
 *      summary: 测试test2的post提交
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  default: 'baseline-web'
 *                phone:
 *                  type: number
 *                  default: 123
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
```

