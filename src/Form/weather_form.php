<?php

namespace Drupal\weather\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class weather_form
 */

class weather_form extends ConfigFormBase{

    /**
     * {@inheritdoc}
     */

     protected function getEditableConfigNames()
     {
        return[
            'weather.weather',
        ];
     }

    /**
     * {@inheritdoc}
    */
    public function getFormId()
    {
        return 'weather';
    }   
    
    /**
     * {@inheritdoc}
     */

     public function buildForm(array $form, FormStateInterface $form_state)
     {
        $config = $this->config('weather.weather');
        $form['key'] = [
            '#type' => 'textfield',
            '#title' => 'Key',
            '#maxlength' => 64,
            '#size' => 64,
            '#default_value' => $config->get('key'),
        ];
        return parent:: buildForm($form, $form_state);

     }

     /**
      *  {@inheritdoc}
      */

    public function submitForm(array &$form, FormStateInterface $form_state)
    {
        parent::submitForm($form, $form_state);

        $this->config('weather.weather')
        ->set('key', $form_state->getValue('key'))
        ->save();
    }

}