

// 先执行微任务 再宏任务

/**  宏任务             浏览器	Node
    setTimeout	        ✅	✅
    setInterval	        ✅	✅
    setImmediate	    ❌	✅
    requestAnimationFrame✅	❌
**/

/**微任务
 *                              浏览器	Node
 *  process.nextTick	       m ❌	✅
    MutationObserver	        ✅	❌
    Promise.then catch finally
 */