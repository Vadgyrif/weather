<?php


namespace Drupal\weather\Plugin\Block;

use Drupal;
use Drupal\Core\Block\BlockBase;

//use Drupal\Core\Form\FormStateInterface;    


/**
 * @Block(
 *   id = "weather_block",
 *   admin_label = @Translation("Weather Block"),
 *   category = @Translation("Custom")
 * )
 */


class WeatherBlock extends BlockBase{

    public function build() {

        $module_path = \Drupal::service('module_handler')->getModule('weather')->getPath();
        $path = \Drupal::request()->getSchemeAndHttpHost() . '/' . $module_path;
    
        $config = \Drupal::config('weather.weather')->get('key');
        $build = [];
        $build['#theme'] = 'weather_theme';
        $build['#path'] = $path;
        $build['weather_theme']['#markup'] = 'Implement weather_theme';
        $build['#attached']['drupalSettings']['weatherApiKey'] = $config;
        $build['#attached']['library'] = ['weather/weather_style'];

        return $build;
    }


}