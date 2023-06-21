import instance from './instance'
import simpleClientModule from './simpleClient'

// eslint-disable-next-line
export default {
    simpleClient: simpleClientModule(instance),
}