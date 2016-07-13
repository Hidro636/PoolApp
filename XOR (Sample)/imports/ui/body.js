import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';


const synaptic = require('synaptic');

import './body.html';

Network = null;
Trainer = synaptic.Trainer;
Architect = synaptic.Architect;

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    this.state.setDefault('training', false);
    this.state.setDefault('result', null);
    this.state.setDefault('trained', false);
});

Template.body.events({
    'submit #inputForm'(event, instance) {
        event.preventDefault();

        if (Network === null) {
            alert("Network not trained yet!");
        }
        else {

            const target = event.target;
            const val1 = target.val1.value;
            const val2 = target.val2.value;

            instance.state.set('result', Math.round(Network.activate([val1, val2])[0]));
        }
    },
    'click #trainButton'(event, instance) {
        event.preventDefault();

        instance.state.set('training', true);

        let trainingSet = [];

        trainingSet[0] = {
            input: [0, 0],
            output: [0]
        };

        trainingSet[1] = {
            input: [0, 1],
            output: [1]
        };

        trainingSet[2] = {
            input: [1, 0],
            output: [1]
        };

        trainingSet[3] = {
            input: [1, 1],
            output: [0]
        };

        var network = new Architect.Perceptron(2, 3, 3, 1);

        const trainer = new Trainer(network);


        const iterations = 20000;
        const rate = 0.1;
        trainer.train(trainingSet);

        Network = network;

        instance.state.set('training', false);
        instance.state.set('trained', true);


    }
});

Template.body.helpers({
    training() {
        return Template.instance().state.get('training');
    },
    trained() {
        return Template.instance().state.get('trained').toString();
    },
    result() {
        return Template.instance().state.get('result');
    }
});

