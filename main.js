import { argv } from 'node:process';

function main() {
    if (argv.length !== 3) {
        console.log('Invalid number of argument(s), please input only ONE argument.')
        return
    }
    console.log(`Crawling thru "${argv[2]}" at the moment...`)
}

main()