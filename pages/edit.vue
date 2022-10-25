<template>
    <div class="edit-container">
        <div class="edit-header-container">
            <div class="edit-header">
                <h2>Images</h2>
                <div class="upload">
                    <input type="file" ref="uploadPhoto" id="uploadPhoto" @change="loadFile" accept="image/*" />
                    <Button @click.native="upload">upload</Button>
                </div>
            </div>
        </div>
        <div class="image-grid" v-if="photos.length > 1">
            <div class="image" v-for="(photo, index) of photos" :key="index">
                <img :src="photo.url" />
                <div class="info">
                    <div class="name">{{photo.name}}</div>
                    <Button @click.native="removePhoto(index)">delete</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GetAdmins, GetFileUrl, GetPhotos, UploadPhoto, DeletePhoto } from "@/services/firebase";
import { getAuth } from "firebase/auth";
export default {
    layout: 'editLayout', 
    data() {
        return {
            photos:[],
            file: null
        }
    },
    head() {
        return {
            title: 'Edit'
        }
    },
    methods: {
        loadFile() {
            this.file = this.$refs.uploadPhoto.files[0];
        },
        async upload() {
            const filename = this.file.name;
            const newFile = await UploadPhoto(this.file);
            const fileurl = await GetFileUrl(filename);
            if (newFile) this.photos.push({name: filename, url: fileurl});
            document.getElementById('uploadPhoto').value = "";
        },
        async removePhoto(index) {
            const filename = this.photos[index].name;
            if (confirm('Are you sure you want to delete ' + filename)) {
                await DeletePhoto(filename);
                this.photos.splice(index, 1);
            }
        }
    },
    async mounted() {
        const auth = getAuth();
        const admins = (await GetAdmins()).data().emails;
        if (auth.currentUser &&
            admins &&
            admins.includes(auth.currentUser.email)) 
        {
            const filenames = (await GetPhotos()).data().Photos;
            for (const filename of filenames) {
                this.photos.push({name: filename, url: await GetFileUrl(filename)});
            }
        } else { 
            this.$router.push("/")
        }
    }
}
</script>

<style lang="scss" scoped>
.edit-container {
    font-family: Arial, Helvetica, sans-serif;
    color: black;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .image-grid {
        display: grid;
        grid-row-gap: 1em;
        grid-column-gap: 1em;
        grid-template-columns: repeat(auto-fill, 200px);
        width: 100%;
        justify-content: center;

        .image {
            grid-column: auto;

            img {
                width: 100%;
            }

            .info {
                margin-top: 0.5em;
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                button {
                    font-size: 10px;
                }
            }
        }

        @media only screen and (max-width: 600px) {
            grid-template-columns: repeat(auto-fill, 80vw);
        }            
    }

    .edit-block {
        display: flex;
        flex-direction: column;
        max-width: 600px;
        margin: 1em;
        width: calc(100% - 2em);

        .prop-block {
            display: flex;
            margin-bottom: 1em;
            justify-content: space-between;

            p {
                margin-right: 1em;
            }

            textarea {
                resize: none;
            }
            input, textarea, button {
                border: none;
                background-color: black;
                color: white;
                border-radius: 9px;
                padding: 1em;
                width: 100% !important;
                max-width: 70%;
            }

            input[type=date] {
                -webkit-appearance: none
            }

            ::-webkit-calendar-picker-indicator {
                filter: invert(1);
            }
        }

        .edit-project-header {
            margin-bottom: 1em;
        }
    }    

    .edit-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            max-height: 3em;
            padding: 1em;
        }

        input {
            font-family: Arial, Helvetica, sans-serif;

            &::file-selector-button {
                transition-duration: 0.4s;
                background-color: #2e2e2e;
                color: white;
                padding: 1em;
                border-radius: 15px;
                width: auto;
                border: none;
                font-weight: 700;
                font-size: 12px;

                &:hover {
                    background-color: black;
                    cursor: pointer;
                }
            }
        }

        @media only screen and (max-width: 1000px) {
            flex-direction: column;

            .upload {
                display: flex;
                flex-direction: column;
                margin-bottom: 1em;

                > * {
                    margin-top: 1em;
                }
            }
        }
    }

    .edit-header {
        margin-left: 1em;
        margin-right: 1em;
    }

    @media only screen and (min-width: 1000px) {
        margin-left: 2em;
        margin-right: 2em;
    }

    .edit-header-container {
        max-width: 100vw;
        width: 100%;
    }
}
</style>