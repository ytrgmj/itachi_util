import {ArrayUtil} from '../../../src/util/ArrayUtil'

 var list = [{
 	id: 1,
 	name: 'aaa',
 	val: 10
 }, {
 	id: 2,
 	name: 'zzz',
 	val: 30
 }, {
 	id: 3,
 	val: 1
 }, {
 	id: 4,
 	name: '111',
 	val: 20
 }, {
 	id: 5,
 	name: '0',
 	val: 1
 }, {
 	id: 6,
 	name: 'ccc',
 	val: 30
 }, {
 	id: 7,
 	name: 'aaa',
 	val: 2
 }]


 test('test',function(){
	function run(obj) {
		console.log('===============', obj)
		ArrayUtil.order(list, obj)
		console.log('list', list)
	}
	run('name')

	run({
		order: 'name',
		'desc': 'desc'
	})
	run([{
		order: 'name',
		'desc': 'desc'
	}, {
		order: 'val'
	}])
})