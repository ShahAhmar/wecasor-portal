<?php

namespace App\Filament\Resources\Notifications\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class NotificationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->numeric(),
                TextInput::make('type')
                    ->required(),
                Textarea::make('message')
                    ->required()
                    ->columnSpanFull(),
                DateTimePicker::make('read_at'),
            ]);
    }
}
