const redNums = new Array(32).fill(0).map((item, i) => i + 1)
const blueNums = new Array(15).fill(0).map((item, i) => i + 1)

function getRomdan(max, count) {
  const nums = []
  while(nums.length < count) {
    const num = Math.floor(Math.random() * max)
    if (nums.includes(num)) continue
    nums.push(num)
  }
  return nums
}

function startOne() {
  const reds = getRomdan(redNums.length, 6).map(i => redNums[i]).sort((a, b) => a - b)
  const blues = getRomdan(blueNums.length, 1).map(i => redNums[i])
  return [reds, blues]
}

function start() {
  let i = 1
  const selects = [[8, 2, 13, 15, 6, 20].sort((a, b) => a - b), [5]]
  while(true) {
    const takeNums = startOne()
    // console.log(`双色球第${i}期为:`, takeNums);
    if (takeNums.toString() === selects.toString()) {
      console.log(`恭喜你第${i}期中一等奖啦,`, '抽奖号码：', takeNums, '购买号码', selects, '\n\n');
      break
    }
    i++
  }
}

function main() {
  for (let i = 1; i <= 20; i++) {
    console.log(`第${i}次`)
    start()
  }
}

main()