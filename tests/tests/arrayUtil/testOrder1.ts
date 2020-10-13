import { ArrayUtil } from '../../../src/util/ArrayUtil'

const newProductList = [
    {
        "productId": 4076,
        "productNo": "1fcc20d2-7230-4779-917a-ecb6466b9c6a",
        "productName": "0",
        "productCategoryDetail": [
            {
                "categorySort": 9999,
                "name": "炒菜",
                "productCategoryNo": "013a3e88-eef8-4a22-adaf-a8e99b716ea5",
                "addTime": "2020-08-19 20:05:25",
                "productCategoryId": 80,
                "sort": 1
            }
        ],
        "index": 0
    },
    {
        "productId": 4076,
        "productNo": "1fcc20d2-7230-4779-917a-ecb6466b9c6a",
        "productName": "1",
        "productCategoryDetail": [
            {
                "categorySort": 1,
                "name": "炒菜",
                "productCategoryNo": "013a3e88-eef8-4a22-adaf-a8e99b716ea5",
                "addTime": "2020-08-19 20:05:25",
                "productCategoryId": 80,
                "sort": 1000
            }
        ],
        "index": 1
    },
    {
        "productId": 4076,
        "productNo": "1fcc20d2-7230-4779-917a-ecb6466b9c6a",
        "productName": "2",
        "productCategoryDetail": [
            {
                "categorySort": 888,
                "name": "炒菜",
                "productCategoryNo": "013a3e88-eef8-4a22-adaf-a8e99b716ea5",
                "addTime": "2020-08-19 20:05:25",
                "productCategoryId": 80,
                "sort": 1
            },
            {
                "categorySort": 999,
                "name": "荤菜",
                "productCategoryNo": "013a3e88-eef8-4a22-adaf-a8e99b716ea5",
                "addTime": "2020-08-19 20:05:25",
                "productCategoryId": 80,
                "sort": 2
            }
        ],
        "index": 2
    }
]


test('test', function () {
    ArrayUtil.order(newProductList, [
      //d { order: 'index', desc: 'asc' },
        {
            order: function (obj) {
                console.log('-------------obj-------');
                console.log(obj);
                ArrayUtil.order(obj.productCategoryDetail, [
                    { order: 'categorySort', desc: 'desc' },
                ])
                return obj.productCategoryDetail[0].categorySort
            }, desc: 'desc'
        },
        {
            order: function (obj) {
                console.log('-------------obj-------');
                console.log(obj);
                ArrayUtil.order(obj.productCategoryDetail, [
                    { order: 'sort', desc: 'desc' },
                ])
            }, desc: 'desc'
        }
    ])
    console.log(JSON.stringify(newProductList));

})