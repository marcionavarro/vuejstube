import * as videoController from "../controllers/video"

const router = createRouter()

router.get('/videos', defineEventHandler(videoController.buscarTodos))
router.get('/videos/:id', defineEventHandler(videoController.buscarPorId))
router.post('/videos', defineEventHandler(videoController.adicionar))
router.put('/videos/:id', defineEventHandler(videoController.atualizar))
router.delete('/videos/:id', defineEventHandler(videoController.deletar))

export default useBase('/api/v1', router.handler)