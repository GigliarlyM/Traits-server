import { Photo } from "./interface-data"
import photographerShcema from "./photographer-schema"
import serviceShcema from "./service-schema"

interface PhotoSimple {
    url: string,
    price: number,
    photographerCpf: string
}

async function createPhotoModel(photoSimple: PhotoSimple) {
    const serviceList = await serviceShcema.find()
    let lastId: number

    if (serviceList.length > 0) {
        lastId = serviceList[serviceList.length - 1].id + 1
    } else {
        lastId = 1
    }

    const photo: Photo = {
        id: lastId,
        url: photoSimple.url,
        price: photoSimple.price,
        photographerCpf: photoSimple.photographerCpf,
        promo: 0
    }

    const service = await serviceShcema.create(photo)

    return { service }
}

async function getPhotoModel(cpfPhotographer: string) {
    return await serviceShcema.find({ photographerCpf: cpfPhotographer })
}

async function getPhotoAllModel() {
    const listPhotos = await serviceShcema.find()

    if (listPhotos.length === 0) throw new Error("Sem fotos no Sistema")

    return listPhotos
}

async function deletePhotoModel(idPhoto: number, cpfPhotographer: string) {
    return await serviceShcema.findOneAndDelete({ id: idPhoto, photographerCpf: cpfPhotographer })
}

async function aplyPromoModel(idPhoto: number, cpfPhotographer: string, priceAlt: number) {
    const photo = await serviceShcema.findOne({photographerCpf: cpfPhotographer, id: idPhoto})
    
    if (!photo) throw new Error("Foto não encontrada")
    
    const promoPhoto = (photo.price - priceAlt) / photo.price

    return await serviceShcema.findOneAndUpdate({photographerCpf: cpfPhotographer, id: idPhoto}, { promo: promoPhoto})
}

export {
    aplyPromoModel,
    createPhotoModel,
    deletePhotoModel,
    getPhotoAllModel,
    getPhotoModel
}

