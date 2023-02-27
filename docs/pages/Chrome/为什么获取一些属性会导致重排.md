浏览器为了优化重排和重绘, 尽量提高性能, 维护了一个队列, 会把引起重排、重绘的操作放入这个队列, 然后做批量处理, 这样就把多次的重排操作合并为一次了。 类似于react中的setState, 合并执行。

虽然浏览器有这个优化, 但是我们的一些操作会引起队列的提前执行。

比如：

offsetTop, offsetLeft, offsetWidth, offsetHeight

scrollTop/Left/Width/Height

clientTop/Left/Width/Height

width,height

getComputedStyle()

等等...



当你请求上面的一些属性的时候，为了保证实时性和准确性，也就是为了给你最精确的值, 浏览器会立即执行队列里的任务。

因为队列中可能会有影响到这些值的操作, 所以浏览器认为应该执行完已存在的队列任务, 才能给你最准确的值。
