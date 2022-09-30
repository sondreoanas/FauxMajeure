<template>
    <div class="edit-container" v-if="page.projects.length > 0">
        <div class="edit-header-container">
            <div class="edit-header">
                <h2>Projects</h2>
                <Button @click.native="addNewProject">add</Button>
            </div>
        </div>
        <div class="edit-block" v-for="(project, index) of page.projects" :key="index">
            <div class="edit-project-header">
                <h3>{{project.name}}</h3>
                <Button @click.native="removeProject(index)">delete</Button>
            </div>
            <div class="prop-block">
                <p>Name</p>
                <input type="text" v-model="project.name" @change="save()">
            </div>
            <div class="prop-block">
                <p>Date</p>
                <input type="date" v-model="project.date" @change="save()">
            </div>
            <div class="prop-block">
                <p>YouTube</p>
                <textarea  v-model="project.youtube" @change="save()"></textarea>
            </div>
            <div class="prop-block">
                <p>SoundCloud</p>
                <textarea  v-model="project.soundcloud" @change="save()"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { GetAdmins, GetProjects, SetProjects } from "@/services/firebase";
import { getAuth } from "firebase/auth";
export default {
    layout: 'editLayout', 
    data() {
        return {
            page: {
                projects: []
            }
        }
    },
    head() {
        return {
            title: 'Edit'
        }
    },
    methods: {
        async save() {
            await SetProjects(this.page);
        },
        addNewProject() {
            this.page.projects.push({name: '', date: '', youtube: '', soudcloud: ''});
            this.save();
        },
        removeProject(index) {
            if (confirm('Are you sure you want to delete this project')) {
                this.page.projects.splice(index, 1);
                this.save();
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
            const projectContainer = await GetProjects();
            let projects = projectContainer.data().projects;
            this.page.projects = projects;
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

    .edit-header, .edit-project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            max-height: 3em;
            padding: 1em;
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