<?php

namespace App\Filament\Resources\SystemSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SystemSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->required()
                    ->unique(ignoreRecord: true),
                Textarea::make('value')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('group')
                    ->required()
                    ->default('General'),
                Textarea::make('description')
                    ->columnSpanFull(),
            ]);
    }
}
