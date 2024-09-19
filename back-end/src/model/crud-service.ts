import { readPhotographerModelUnique } from "./crud-photographer"
import { readDataModel, writeDataModel } from "./func-data"

interface PhotoSimple {
    url: string,
    price: number
}

function createPhotoModel(cpfPhotographer: string, photo: PhotoSimple) {
    const listAll = readDataModel()

    readPhotographerModelUnique(cpfPhotographer)

    if (listAll.photos.find(element => element.url === photo.url))
        throw new Error(`Existe uma foto com essa url`);

    const position = listAll.photos.push({
        url: photo.url,
        price: photo.price,
        cpfPhotographer,
        id: listAll.photos.length + 1,
        promo: 0
    })
    writeDataModel(listAll)

    return position
}

function getPhotoModel(cpfPhotographer: string) {
    return readDataModel().photos.filter(element => element.cpfPhotographer == cpfPhotographer)
}

function getPhotoAllModel() {
    const listPhotos = readDataModel().photos
    
    const resp = listPhotos.map(photo => ({
        id: photo.id,
        url: photo.url,
        criador: readPhotographerModelUnique(photo.cpfPhotographer).apelido,
        price: photo.price,
        promo: photo.promo
    }))

    return resp
}

function deletePhotoModel(idPhoto: number, cpfPhotographer: string) {
    const listAll = readDataModel()
    const index = listAll.photos
        .filter(photo => photo.cpfPhotographer == cpfPhotographer)
        .findIndex(element => element.id === idPhoto)
    
    if (index == -1) throw new Error("Foto não encontrada");

    listAll.photos.splice(index, 1)

    writeDataModel(listAll)
}

function aplyPromoModel(idPhoto: number, cpfPhotographer: string, priceAlt: number) {
    const listAll = readDataModel()
    const photoPosition = listAll.photos.findIndex(element => element.id === idPhoto)
    
    if (photoPosition == -1)
        throw new Error(`Foto não encontrada`);
    
    const photo = listAll.photos[photoPosition]
    const decimalPrice = (photo.price - priceAlt) / photo.price

    photo.promo = decimalPrice // A promo eh guardada em porcentagem (decimal)
    listAll.photos[photoPosition] = photo

    writeDataModel(listAll)

    return decimalPrice
}

export {
    aplyPromoModel, createPhotoModel, deletePhotoModel, getPhotoAllModel, getPhotoModel
}

