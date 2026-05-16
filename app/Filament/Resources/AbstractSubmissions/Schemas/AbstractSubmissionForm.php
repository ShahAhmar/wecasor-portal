<?php

namespace App\Filament\Resources\AbstractSubmissions\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AbstractSubmissionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('institution')
                    ->required(),
                TextInput::make('country')
                    ->required(),
                TextInput::make('title')
                    ->required(),
                Textarea::make('abstract_content')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('thematic_area')
                    ->required(),
                TextInput::make('presentation_type')
                    ->required()
                    ->default('Oral'),
                TextInput::make('status')
                    ->required()
                    ->default('pending'),
                TextInput::make('language')
                    ->required()
                    ->default('en'),
            ]);
    }
}
